document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js init, INDIA_PLACES=", (window.INDIA_PLACES || []).length);

  const PLACES = window.INDIA_PLACES || [];

  const stateInput = document.getElementById("stateInput");
  const cityInput = document.getElementById("cityInput");
  const resultsContainer = document.getElementById("resultsContainer");
  const pageInfo = document.getElementById("pageInfo");
  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");

  const PER_PAGE = 12;
  let currentPage = 1;
  let activeTags = new Set();
  let filtered = PLACES.slice();

  /* -----------------------------------------
        BUILD STATE → CITY LIST
  ------------------------------------------ */
  const STATES = [...new Set(PLACES.map(p => p.state))].sort();

  const CITIES_BY_STATE = {};
  STATES.forEach(state => {
    CITIES_BY_STATE[state] = [
      ...new Set(PLACES.filter(p => p.state === state).map(p => p.city))
    ].sort();
  });

  /* -----------------------------------------
        LOAD STATES
  ------------------------------------------ */
  function loadStates() {
    stateInput.innerHTML = '<option value="">-- Select State --</option>';
    STATES.forEach(s => {
      stateInput.innerHTML += `<option value="${s}">${s}</option>`;
    });
  }

  /* -----------------------------------------
        LOAD CITIES FOR STATE
  ------------------------------------------ */
  function loadCities(state) {
    cityInput.innerHTML = '<option value="">-- Select City --</option>';
    if (!state) return;

    CITIES_BY_STATE[state].forEach(c => {
      cityInput.innerHTML += `<option value="${c}">${c}</option>`;
    });
  }

  stateInput.addEventListener("change", () => loadCities(stateInput.value));

  /* -----------------------------------------
        CHIP FILTERS
  ------------------------------------------ */
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const tag = chip.dataset.tag;

      if (activeTags.has(tag)) {
        activeTags.delete(tag);
        chip.classList.remove("active");
      } else {
        activeTags.add(tag);
        chip.classList.add("active");
      }
    });
  });

  /* -----------------------------------------
        SEARCH FUNCTION
  ------------------------------------------ */
  function applySearch() {
    const st = stateInput.value;
    const ct = cityInput.value;

    filtered = PLACES.filter(p => {
      if (st && p.state !== st) return false;
      if (ct && p.city !== ct) return false;

      if (activeTags.size > 0) {
        const match = [...activeTags].some(t => p.tags.includes(t));
        if (!match) return false;
      }
      return true;
    });

    currentPage = 1;
    render();
  }

  /* -----------------------------------------
        RESET SEARCH
  ------------------------------------------ */
  function resetSearch() {
    activeTags.clear();
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    stateInput.value = "";
    cityInput.innerHTML = '<option value="">-- Select City --</option>';

    filtered = PLACES.slice();
    currentPage = 1;
    render();
  }

  window.applySearch = applySearch;
  window.resetSearch = resetSearch;

  /* -----------------------------------------
        PAGINATION
  ------------------------------------------ */
  prevPage.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      render();
    }
  });

  nextPage.addEventListener("click", () => {
    const total = Math.ceil(filtered.length / PER_PAGE);
    if (currentPage < total) {
      currentPage++;
      render();
    }
  });

  /* -----------------------------------------
        OPEN MAP PANEL
  ------------------------------------------ */
  window.openMap = function (name, city, state) {
    const q = encodeURIComponent(name); // Best accuracy
    const url = `https://www.google.com/maps?q=${q}&output=embed`;

    window.currentPlaceQuery = q;

    document.getElementById("mapTitle").textContent = name;
    document.getElementById("mapFrame").src = url;

    document.getElementById("mapPanel").classList.add("show");
  };

  /* -----------------------------------------
        FULLSCREEN MAP
  ------------------------------------------ */
  window.openFullMap = function () {
    const src = document.getElementById("mapFrame").src;
    window.open(src, "_blank");
  };

  /* -----------------------------------------
        GPS: LOCATE USER
  ------------------------------------------ */
  window.locateUser = function () {
    if (!navigator.geolocation) {
      alert("Your device does not support GPS.");
      return;
    }

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log("GPS Location:", lat, lng);

      const base = document.getElementById("mapFrame").src.split("&markers=")[0];
      const gpsURL = `${base}&markers=color:blue|${lat},${lng}`;

      document.getElementById("mapFrame").src = gpsURL;

      alert("📍 Your location has been marked on the map.");
    }

    function error(err) {
      alert("GPS access denied. Please allow location permission.");
      console.error(err);
    }
  };

  /* -----------------------------------------
        DIRECTIONS BUTTON
  ------------------------------------------ */
  window.openDirections = function () {
    if (!window.currentPlaceQuery) return;

    const url =
      `https://www.google.com/maps/dir/?api=1&destination=${window.currentPlaceQuery}`;

    window.open(url, "_blank");
  };

  /* -----------------------------------------
        ⭐ NEARBY PLACES FEATURE ⭐
  ------------------------------------------ */
  window.openNearby = function(type) {
    if (!window.currentPlaceQuery) return;

    const q = decodeURIComponent(window.currentPlaceQuery);
    const search = encodeURIComponent(`${type} near ${q}`);

    const url = `https://www.google.com/maps/search/${search}`;

    window.open(url, "_blank");
  };

  /* -----------------------------------------
        DRAG TO CLOSE MAP PANEL
  ------------------------------------------ */
  let isDragging = false;
  let startY = 0;

  const mapPanel = document.getElementById("mapPanel");
  const dragHandle = document.querySelector(".drag-handle");

  function startDrag(y) {
    isDragging = true;
    startY = y;
  }

  function moveDrag(y) {
    if (!isDragging) return;
    const diff = y - startY;
    if (diff > 80) {
      mapPanel.classList.remove("show");
      isDragging = false;
    }
  }

  function endDrag() {
    isDragging = false;
  }

  dragHandle.addEventListener("mousedown", e => startDrag(e.clientY));
  document.addEventListener("mousemove", e => moveDrag(e.clientY));
  document.addEventListener("mouseup", endDrag);

  dragHandle.addEventListener("touchstart", e => startDrag(e.touches[0].clientY));
  dragHandle.addEventListener("touchmove", e => moveDrag(e.touches[0].clientY));
  dragHandle.addEventListener("touchend", endDrag);

  /* -----------------------------------------
        RENDER CARDS
  ------------------------------------------ */
  function render() {
    resultsContainer.innerHTML = "";

    if (filtered.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      pageInfo.textContent = "";
      return;
    }

    const start = (currentPage - 1) * PER_PAGE;
    const items = filtered.slice(start, start + PER_PAGE);

    items.forEach(p => {
      resultsContainer.innerHTML += `
        <div class="card" onclick="openMap('${p.name}', '${p.city}', '${p.state}')">
          <img src="${p.img}">
          <h3>${p.name}</h3>
          <p>${p.city}, ${p.state}</p>
        </div>
      `;
    });

    const total = Math.ceil(filtered.length / PER_PAGE);
    pageInfo.textContent = `${currentPage} / ${total}`;
  }

  /* INIT */
  loadStates();
  filtered = PLACES.slice();
  render();
});
