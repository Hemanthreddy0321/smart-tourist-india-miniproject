/* ============================================================
   Smart Tourist — India
   DATA FILE: data_places.js
   Contains:
   - SVG generator (with your palettes)
   - escapeXml
   - mkPlace()
   - PLACE_TUPLES (your curated data)
   - Builder generating INDIA_PLACES (500 items)
   - Exposed globally -> window.INDIA_PLACES
===============================================================*/

/* ------------------------------------------------------------
   SVG Illustration Generator (YOUR PALETTES ADDED)
------------------------------------------------------------ */
/* --------------------------------------------------------
   Color palettes
-------------------------------------------------------- */
const palettes = [
  ["#fce7f3","#f6d7ff","#dbeafe"],
  ["#fff7ed","#ffe7c2","#ffd8a8"],
  ["#eef2ff","#e0f2fe","#dbeafe"],
  ["#f0fdf4","#dcfce7","#bbf7d0"],
  ["#fff1f2","#ffe4e6","#ffdbe6"],
  ["#fefce8","#fff7c0","#fff1a8"],
  ["#f3e8ff","#e9d5ff","#d8b4fe"],
  ["#ecfeff","#cffafe","#bbf7d0"],
  ["#fff7ed","#ffe4a3","#ffd8b8"],
  ["#f8fafc","#eef2ff","#e9d8fd"]
];

/* --------------------------------------------------------
   Escape XML text
-------------------------------------------------------- */
function escapeXml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

/* --------------------------------------------------------
   SVG Illustration Generator
-------------------------------------------------------- */
function svgIllustration(title, subtitle, seed) {
  const p = palettes[Math.abs(seed) % palettes.length];
  const w = 1200, h = 800;
  const circles = [];

  for (let i = 0; i < 6; i++) {
    const cx = 100 + (seed * 25 + i * 150) % 1000;
    const cy = 120 + (seed * 22 + i * 90) % 550;
    const r  = 120 + (seed * i) % 150;

    circles.push(`
      <circle cx="${cx}" cy="${cy}" r="${r}"
      fill="${p[i % p.length]}" opacity="0.08" />
    `);
  }

  const svg = `
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad${seed}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stop-color="${p[0]}" />
        <stop offset="50%"  stop-color="${p[1]}" />
        <stop offset="100%" stop-color="${p[2]}" />
      </linearGradient>
    </defs>

    <rect width="100%" height="100%" fill="url(#grad${seed})" />
    <g>${circles.join("")}</g>

    <text x="60" y="540"
      font-size="52"
      fill="rgba(20,20,20,0.88)"
      font-family="Inter"
      font-weight="700">
      ${escapeXml(title)}
    </text>

    <text x="60" y="610"
      font-size="30"
      fill="rgba(20,20,20,0.65)"
      font-family="Inter"
      font-weight="500">
      ${escapeXml(subtitle)}
    </text>
  </svg>`;

  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* --------------------------------------------------------
   Convert tuple → place object
-------------------------------------------------------- */
function mkPlace(id, tuple) {
  const [name, city, state, tags, cost, eco] = tuple;
  return {
    id,
    name,
    city,
    state,
    tags,
    cost,
    eco,
    img: svgIllustration(name, city, id)
  };
}


/* ------------------------------------------------------------
   PLACE_TUPLES (your whole curated dataset goes here)
------------------------------------------------------------ */

/* IMPORTANT:
   You must paste your full PLACE_TUPLES array here.
   Because it's extremely long, I am not re-pasting all 500 lines.
   Replace this placeholder with your complete PLACE_TUPLES list.
*/

const PLACE_TUPLES = [
  ["Madurai Fort","Madurai","Tamil Nadu",["view","food"],60,true],
  ["Madurai Ghat","Madurai","Tamil Nadu",["adventure","rail"],150,true],
  ["Chennai Beach","Chennai","Tamil Nadu",["culture","food"],250,true],
  ["Pondicherry Garden","Pondicherry","Tamil Nadu",["crafts","history"],150,true],
  ["Mahabalipuram Cave","Mahabalipuram","Tamil Nadu",["view","heritage"],40,false],
  ["Ooty Palace","Ooty","Tamil Nadu",["beach","culture"],100,true],
  ["Madurai Tea Gardens","Madurai","Tamil Nadu",["spiritual","fort"],100,true],
  ["Chennai Island","Chennai","Tamil Nadu",["history","spiritual"],150,true],
  ["Pondicherry Monument","Pondicherry","Tamil Nadu",["crafts","festival"],100,true],
  ["Madurai Temple","Madurai","Tamil Nadu",["food","unique"],20,true],
  ["Ooty Wildlife Sanctuary","Ooty","Tamil Nadu",["culture","view"],20,true],
  ["Pondicherry Falls","Pondicherry","Tamil Nadu",["wildlife","waterfall"],150,true],
  ["Ooty Tea Gardens","Ooty","Tamil Nadu",["view","adventure"],60,true],
  ["Tiruchirappalli Lake","Tiruchirappalli","Tamil Nadu",["temple","waterfall"],40,true],
  ["Coimbatore Falls","Coimbatore","Tamil Nadu",["history","crafts"],80,false],
  ["Salem Tea Gardens","Salem","Tamil Nadu",["fort","food"],40,false],
  ["Salem Beach","Salem","Tamil Nadu",["temple","crafts"],300,false],
  ["Kottayam Palace","Kottayam","Kerala",["history","heritage"],20,true],
  ["Varkala Museum","Varkala","Kerala",["unique","garden"],40,false],
  ["Kochi Palace","Kochi","Kerala",["island","wildlife"],250,true],
  ["Alleppey Railway","Alleppey","Kerala",["festival","culture"],40,true],
  ["Kozhikode Ghat","Kozhikode","Kerala",["island","heritage"],300,true],
  ["Kollam Fort","Kollam","Kerala",["spiritual","fort"],80,true],
  ["Kochi Falls","Kochi","Kerala",["rail","adventure"],20,false],
  ["Thiruvananthapuram Ghat","Thiruvananthapuram","Kerala",["beach","crafts"],200,true],
  ["Alleppey Tea Gardens","Alleppey","Kerala",["crafts","fort"],200,false],
  ["Thiruvananthapuram Falls","Thiruvananthapuram","Kerala",["food","adventure"],100,true],
  ["Kasaragod Ghat","Kasaragod","Kerala",["food","rail"],60,true],
  ["Thiruvananthapuram Temple","Thiruvananthapuram","Kerala",["food","adventure"],0,true],
  ["Thiruvananthapuram Railway","Thiruvananthapuram","Kerala",["food","view"],200,true],
  ["Kottayam Viewpoint","Kottayam","Kerala",["rail","crafts"],200,true],
  ["Kollam Backwaters","Kollam","Kerala",["culture","spiritual"],20,false],
  ["Varkala Backwaters","Varkala","Kerala",["garden","waterfall"],0,true],
  ["Kochi Tea Gardens","Kochi","Kerala",["museum","spiritual"],60,true],
  ["Munnar Ghat","Munnar","Kerala",["waterfall","beach"],150,true],
  ["Alleppey Island","Alleppey","Kerala",["food","adventure"],200,true],
  ["Bengaluru Ghat","Bengaluru","Karnataka",["heritage","adventure"],60,true],
  ["Hubli Lake","Hubli","Karnataka",["trekking","culture"],150,true],
  ["Mangalore Tea Gardens","Mangalore","Karnataka",["heritage","temple"],80,false],
  ["Coorg Backwaters","Coorg","Karnataka",["history","trekking"],40,true],
  ["Coorg Garden","Coorg","Karnataka",["nature","rail"],250,true],
  ["Belagavi Temple","Belagavi","Karnataka",["nature","rail"],200,true],
  ["Bengaluru Railway","Bengaluru","Karnataka",["adventure","wildlife"],20,true],
  ["Hampi Tea Gardens","Hampi","Karnataka",["spiritual","rail"],60,true],
  ["Shimoga Beach","Shimoga","Karnataka",["garden","rail"],300,true],
  ["Mangalore Monument","Mangalore","Karnataka",["waterfall","museum"],20,true],
  ["Davangere Island Beach","Davangere","Karnataka",["rail","spiritual"],20,true],
  ["Udupi Palace","Udupi","Karnataka",["beach","fort"],20,true],
  ["Belagavi Monument","Belagavi","Karnataka",["wildlife","waterfall"],250,true],
  ["Shimoga Railway","Shimoga","Karnataka",["heritage","history"],80,true],
  ["Mangalore Palace","Mangalore","Karnataka",["spiritual","crafts"],250,true],
  ["Coorg Monument","Coorg","Karnataka",["festival","culture"],100,true],
  ["Coorg Railway","Coorg","Karnataka",["trekking","view"],0,true],
  ["Hubli Palace","Hubli","Karnataka",["nature","heritage"],100,true],
  ["Coorg Market","Coorg","Karnataka",["waterfall","history"],150,true],
  ["Pune Beach","Pune","Maharashtra",["beach","history"],0,true],
  ["Ratnagiri Ghat","Ratnagiri","Maharashtra",["beach","garden"],40,true],
  ["Nashik Wildlife Sanctuary","Nashik","Maharashtra",["nature","fort"],60,true],
  ["Pune Wildlife Sanctuary","Pune","Maharashtra",["history","garden"],300,true],
  ["Nagpur Market","Nagpur","Maharashtra",["wildlife","garden"],0,true],
  ["Alibaug Backwaters","Alibaug","Maharashtra",["food","view"],40,true],
  ["Konkan Temple","Konkan","Maharashtra",["trekking","food"],60,false],
  ["Alibaug Monument","Alibaug","Maharashtra",["food","crafts"],0,true],
  ["Heritage Site of Konkan","Konkan","Maharashtra",["view","adventure"],80,true],
  ["Mahabaleshwar Tea Gardens","Mahabaleshwar","Maharashtra",["history","museum"],0,true],
  ["Nashik Market","Nashik","Maharashtra",["rail","view"],0,true],
  ["Ratnagiri Backwaters","Ratnagiri","Maharashtra",["fort","museum"],150,true],
  ["Konkan Cave","Konkan","Maharashtra",["culture","view"],0,false],
  ["Mumbai Railway","Mumbai","Maharashtra",["history","culture"],100,false],
  ["Heritage Site of Pune","Pune","Maharashtra",["festival","museum"],20,true],
  ["Mahabaleshwar Monument","Mahabaleshwar","Maharashtra",["garden","museum"],150,true],
  ["Mahabaleshwar Viewpoint","Mahabaleshwar","Maharashtra",["culture","garden"],150,true],
  ["Ratnagiri Cave","Ratnagiri","Maharashtra",["unique","temple"],250,true],
  ["Nashik Monument","Nashik","Maharashtra",["culture","garden"],300,true],
  ["Kolhapur Island","Kolhapur","Maharashtra",["waterfall","culture"],250,false],
  ["Jodhpur Beach","Jodhpur","Rajasthan",["unique","island"],300,true],
  ["Udaipur Falls","Udaipur","Rajasthan",["unique","food"],60,true],
  ["Jaipur Temple","Jaipur","Rajasthan",["food","trekking"],300,true],
  ["Mount Abu Backwaters","Mount Abu","Rajasthan",["crafts","rail"],60,false],
  ["Mount Abu Tea Gardens","Mount Abu","Rajasthan",["food","beach"],0,true],
  ["Ranthambore Falls","Ranthambore","Rajasthan",["wildlife","island"],200,true],
  ["Ajmer Falls","Ajmer","Rajasthan",["spiritual","waterfall"],40,false],
  ["Ajmer Ghat","Ajmer","Rajasthan",["festival","museum"],200,false],
  ["Ajmer Island","Ajmer","Rajasthan",["wildlife","trekking"],200,true],
  ["Jaisalmer Palace","Jaisalmer","Rajasthan",["island","trekking"],60,true],
  ["Mount Abu Beach","Mount Abu","Rajasthan",["unique","food"],80,true],
  ["Bikaner Ghat","Bikaner","Rajasthan",["adventure","beach"],40,true],
  ["Ranthambore Viewpoint","Ranthambore","Rajasthan",["culture","adventure"],150,false],
  ["Ranthambore Tea Gardens","Ranthambore","Rajasthan",["rail","heritage"],300,false],
  ["Mount Abu Fort","Mount Abu","Rajasthan",["fort","unique"],150,false],
  ["Pushkar Backwaters","Pushkar","Rajasthan",["trekking","heritage"],150,true],
  ["Ranthambore Market","Ranthambore","Rajasthan",["waterfall","beach"],300,true],
  ["Ranthambore Cave","Ranthambore","Rajasthan",["rail","heritage"],20,false],
  ["Lucknow Island","Lucknow","Uttar Pradesh",["wildlife","nature"],80,false],
  ["Ayodhya Garden","Ayodhya","Uttar Pradesh",["waterfall","museum"],100,false],
  ["Mathura Backwaters","Mathura","Uttar Pradesh",["view","adventure"],200,true],
  ["Aligarh Temple","Aligarh","Uttar Pradesh",["fort","food"],20,true],
  ["Agra Falls","Agra","Uttar Pradesh",["culture","heritage"],300,true],
  ["Kanpur Viewpoint","Kanpur","Uttar Pradesh",["trekking","spiritual"],300,true],
  ["Jhansi Palace","Jhansi","Uttar Pradesh",["fort","wildlife"],300,true],
  ["Lucknow Monument","Lucknow","Uttar Pradesh",["spiritual","rail"],0,true],
  ["Sarnath Tea Gardens","Sarnath","Uttar Pradesh",["temple","culture"],20,true],
  ["Varanasi Monument","Varanasi","Uttar Pradesh",["festival","spiritual"],300,true],
  ["Ayodhya Ghat","Ayodhya","Uttar Pradesh",["garden","fort"],20,true],
  ["Agra Backwaters","Agra","Uttar Pradesh",["trekking","spiritual"],150,true],
  ["Jhansi Viewpoint","Jhansi","Uttar Pradesh",["garden","wildlife"],250,true],
  ["Sarnath Ghat","Sarnath","Uttar Pradesh",["trekking","waterfall"],150,true],
  ["Ayodhya Falls","Ayodhya","Uttar Pradesh",["adventure","view"],200,true],
  ["Jhansi Cave","Jhansi","Uttar Pradesh",["festival","temple"],100,true],
  ["Heritage Site of Jhansi","Jhansi","Uttar Pradesh",["wildlife","trekking"],60,true],
  ["Heritage Site of Mathura","Mathura","Uttar Pradesh",["view","festival"],80,true],
  ["Aligarh Garden","Aligarh","Uttar Pradesh",["adventure","food"],150,false],
  ["Aligarh Falls","Aligarh","Uttar Pradesh",["trekking","crafts"],200,true],
  ["Vadodara Monument","Vadodara","Gujarat",["food","temple"],60,true],
  ["Gandhinagar Wildlife Sanctuary","Gandhinagar","Gujarat",["trekking","history"],250,true],
  ["Junagadh Ghat","Junagadh","Gujarat",["museum","fort"],200,true],
  ["Dwarka Palace","Dwarka","Gujarat",["food","spiritual"],60,true],
  ["Vadodara Ghat","Vadodara","Gujarat",["wildlife","culture"],60,false],
  ["Dwarka Cave","Dwarka","Gujarat",["island","festival"],80,true],
  ["Bhuj Monument","Bhuj","Gujarat",["food","fort"],40,true],
  ["Ahmedabad Ghat","Ahmedabad","Gujarat",["beach","view"],0,true],
  ["Saputara Monument","Saputara","Gujarat",["beach","trekking"],20,true],
  ["Gandhinagar Monument","Gandhinagar","Gujarat",["trekking","crafts"],200,true],
  ["Surat Temple","Surat","Gujarat",["view","trekking"],20,true],
  ["Junagadh Lake","Junagadh","Gujarat",["adventure","rail"],0,true],
  ["Surat Cave","Surat","Gujarat",["unique","adventure"],60,true],
  ["Saputara Backwaters","Saputara","Gujarat",["festival","crafts"],300,true],
  ["Saputara Tea Gardens","Saputara","Gujarat",["waterfall","crafts"],80,false],
  ["Bhuj Garden","Bhuj","Gujarat",["view","adventure"],40,true],
  ["Surat Ghat","Surat","Gujarat",["adventure","wildlife"],0,false],
  ["Porbandar Island Beach","Porbandar","Gujarat",["trekking","unique"],0,true],
  ["Dwarka Monument","Dwarka","Gujarat",["waterfall","adventure"],60,true],
  ["Kolkata Suburbs Garden","Kolkata Suburbs","West Bengal",["garden","spiritual"],250,true],
  ["Sundarbans Palace","Sundarbans","West Bengal",["beach","adventure"],0,true],
  ["Shantiniketan Island Beach","Shantiniketan","West Bengal",["rail","unique"],200,true],
  ["Mayapur Monument","Mayapur","West Bengal",["temple","view"],250,false],
  ["Mayapur Beach","Mayapur","West Bengal",["festival","nature"],150,true],
  ["Kolkata Suburbs Palace","Kolkata Suburbs","West Bengal",["heritage","adventure"],60,true],
  ["Shantiniketan Cave","Shantiniketan","West Bengal",["nature","wildlife"],200,false],
  ["Shantiniketan Market","Shantiniketan","West Bengal",["rail","garden"],200,true],
  ["Mayapur Wildlife Sanctuary","Mayapur","West Bengal",["garden","museum"],100,true],
  ["Heritage Site of Sundarbans","Sundarbans","West Bengal",["garden","trekking"],80,false],
  ["Murshidabad Temple","Murshidabad","West Bengal",["waterfall","adventure"],100,true],
  ["Siliguri Museum","Siliguri","West Bengal",["temple","island"],0,false],
  ["Howrah Temple","Howrah","West Bengal",["culture","island"],100,false],
  ["Mayapur Temple","Mayapur","West Bengal",["culture","view"],250,true],
  ["Shantiniketan Island","Shantiniketan","West Bengal",["trekking","spiritual"],0,true],
  ["Sundarbans Monument","Sundarbans","West Bengal",["history","heritage"],250,false],
  ["Darjeeling Falls","Darjeeling","West Bengal",["spiritual","waterfall"],20,true],
  ["Mayapur Falls","Mayapur","West Bengal",["waterfall","history"],40,false],
  ["Digha Island Beach","Digha","West Bengal",["island","beach"],20,true],
  ["Heritage Site of Anandpur Sahib","Anandpur Sahib","Punjab",["island","view"],0,true],
  ["Chandigarh Cave","Chandigarh","Punjab",["rail","trekking"],40,false],
  ["Firozpur Lake","Firozpur","Punjab",["fort","museum"],250,false],
  ["Heritage Site of Hoshiarpur","Hoshiarpur","Punjab",["culture","food"],300,false],
  ["Patiala Backwaters","Patiala","Punjab",["nature","museum"],200,false],
  ["Anandpur Sahib Viewpoint","Anandpur Sahib","Punjab",["trekking","nature"],40,true],
  ["Ludhiana Island","Ludhiana","Punjab",["spiritual","island"],200,true],
  ["Jalandhar Backwaters","Jalandhar","Punjab",["crafts","beach"],20,false],
  ["Heritage Site of Chandigarh","Chandigarh","Punjab",["festival","temple"],20,true],
  ["Firozpur Tea Gardens","Firozpur","Punjab",["museum","trekking"],250,true],
  ["Pathankot Beach","Pathankot","Punjab",["food","unique"],60,true],
  ["Anandpur Sahib Museum","Anandpur Sahib","Punjab",["crafts","spiritual"],200,true],
  ["Chandigarh Fort","Chandigarh","Punjab",["nature","museum"],0,true],
  ["Bathinda Wildlife Sanctuary","Bathinda","Punjab",["garden","beach"],60,false],
  ["Pathankot Market","Pathankot","Punjab",["wildlife","crafts"],20,false],
  ["Pathankot Falls","Pathankot","Punjab",["trekking","rail"],40,true],
  ["Hoshiarpur Palace","Hoshiarpur","Punjab",["waterfall","view"],0,false],
  ["Chandigarh Ghat","Chandigarh","Punjab",["wildlife","adventure"],200,true],
  ["Pathankot Monument","Pathankot","Punjab",["crafts","garden"],80,false],
  ["Chandigarh Garden","Chandigarh","Punjab",["temple","trekking"],20,true],
  ["Kangra Cave","Kangra","Himachal Pradesh",["fort","rail"],80,true],
  ["Shimla Tea Gardens","Shimla","Himachal Pradesh",["view","heritage"],300,true],
  ["Dalhousie Lake","Dalhousie","Himachal Pradesh",["unique","food"],300,true],
  ["Kullu Garden","Kullu","Himachal Pradesh",["festival","view"],40,true],
  ["Shimla Monument","Shimla","Himachal Pradesh",["waterfall","nature"],300,true],
  ["Dharamshala Beach","Dharamshala","Himachal Pradesh",["unique","museum"],150,true],
  ["Kullu Viewpoint","Kullu","Himachal Pradesh",["history","fort"],250,true],
  ["Dharamshala Palace","Dharamshala","Himachal Pradesh",["trekking","unique"],100,true],
  ["Chamba Beach","Chamba","Himachal Pradesh",["beach","food"],150,true],
  ["Manali Tea Gardens","Manali","Himachal Pradesh",["heritage","view"],250,true],
  ["Chamba Wildlife Sanctuary","Chamba","Himachal Pradesh",["view","rail"],150,true],
  ["Manali Falls","Manali","Himachal Pradesh",["trekking","heritage"],300,true],
  ["Dalhousie Falls","Dalhousie","Himachal Pradesh",["crafts","adventure"],200,true],
  ["Kangra Museum","Kangra","Himachal Pradesh",["beach","nature"],0,true],
  ["Chamba Museum","Chamba","Himachal Pradesh",["spiritual","food"],250,true],
  ["Kangra Island","Kangra","Himachal Pradesh",["fort","history"],150,true],
  ["Shimla Wildlife Sanctuary","Shimla","Himachal Pradesh",["culture","waterfall"],200,true],
  ["Solan Museum","Solan","Himachal Pradesh",["fort","history"],100,true],
  ["Kangra Palace","Kangra","Himachal Pradesh",["culture","spiritual"],200,true],
  ["Haridwar Island Beach","Haridwar","Uttarakhand",["heritage","nature"],100,true],
  ["Rishikesh Cave","Rishikesh","Uttarakhand",["culture","adventure"],250,true],
  ["Pithoragarh Garden","Pithoragarh","Uttarakhand",["food","museum"],40,true],
  ["Mussoorie Viewpoint","Mussoorie","Uttarakhand",["beach","history"],80,true],
  ["Nainital Fort","Nainital","Uttarakhand",["beach","heritage"],100,true],
  ["Heritage Site of Pithoragarh","Pithoragarh","Uttarakhand",["heritage","wildlife"],80,true],
  ["Rishikesh Backwaters","Rishikesh","Uttarakhand",["island","spiritual"],20,false],
  ["Almora Wildlife Sanctuary","Almora","Uttarakhand",["island","rail"],20,false],
  ["Jim Corbett Falls","Jim Corbett","Uttarakhand",["festival","nature"],250,true],
  ["Almora Fort","Almora","Uttarakhand",["nature","trekking"],150,false],
  ["Nainital Lake","Nainital","Uttarakhand",["waterfall","adventure"],20,true],
  ["Pithoragarh Viewpoint","Pithoragarh","Uttarakhand",["adventure","beach"],80,true],
  ["Kedarnath Island Beach","Kedarnath","Uttarakhand",["island","unique"],200,false],
  ["Nainital Museum","Nainital","Uttarakhand",["crafts","history"],60,false],
  ["Almora Falls","Almora","Uttarakhand",["garden","museum"],200,false],
  ["Kedarnath Museum","Kedarnath","Uttarakhand",["museum","garden"],100,true],
  ["Badrinath Viewpoint","Badrinath","Uttarakhand",["trekking","adventure"],20,true],
  ["Nainital Backwaters","Nainital","Uttarakhand",["spiritual","fort"],40,true],
  ["Pithoragarh Ghat","Pithoragarh","Uttarakhand",["history","museum"],20,false],
  ["Badrinath Backwaters","Badrinath","Uttarakhand",["nature","unique"],300,true],
  ["Gwalior Museum","Gwalior","Madhya Pradesh",["rail","island"],60,true],
  ["Maheshwar Falls","Maheshwar","Madhya Pradesh",["spiritual","fort"],250,true],
  ["Khajuraho Palace","Khajuraho","Madhya Pradesh",["rail","food"],150,true],
  ["Ujjain Palace","Ujjain","Madhya Pradesh",["heritage","wildlife"],80,true],
  ["Gwalior Wildlife Sanctuary","Gwalior","Madhya Pradesh",["heritage","wildlife"],40,false],
  ["Khajuraho Viewpoint","Khajuraho","Madhya Pradesh",["crafts","heritage"],20,true],
  ["Orchha Backwaters","Orchha","Madhya Pradesh",["waterfall","museum"],40,true],
  ["Heritage Site of Bandhavgarh","Bandhavgarh","Madhya Pradesh",["rail","festival"],20,true],
  ["Sanchi Market","Sanchi","Madhya Pradesh",["festival","nature"],20,true],
  ["Maheshwar Backwaters","Maheshwar","Madhya Pradesh",["trekking","festival"],200,false],
  ["Bandhavgarh Garden","Bandhavgarh","Madhya Pradesh",["island","spiritual"],100,false],
  ["Khajuraho Monument","Khajuraho","Madhya Pradesh",["rail","trekking"],250,true],
  ["Bhopal Falls","Bhopal","Madhya Pradesh",["temple","festival"],0,true],
  ["Pench Monument","Pench","Madhya Pradesh",["culture","beach"],80,true],
  ["Sanchi Tea Gardens","Sanchi","Madhya Pradesh",["history","food"],250,true],
  ["Khajuraho Tea Gardens","Khajuraho","Madhya Pradesh",["nature","garden"],0,false],
  ["Heritage Site of Khajuraho","Khajuraho","Madhya Pradesh",["rail","garden"],300,false],
  ["Orchha Monument","Orchha","Madhya Pradesh",["spiritual","temple"],0,true],
  ["Sanchi Island Beach","Sanchi","Madhya Pradesh",["waterfall","fort"],20,false],
  ["Tirupati Falls","Tirupati","Andhra Pradesh",["garden","rail"],150,true],
  ["Rajahmundry Monument","Rajahmundry","Andhra Pradesh",["museum","food"],100,true],
  ["Tirupati Railway","Tirupati","Andhra Pradesh",["crafts","spiritual"],250,true],
  ["Nellore Wildlife Sanctuary","Nellore","Andhra Pradesh",["crafts","beach"],60,true],
  ["Vijayawada Palace","Vijayawada","Andhra Pradesh",["culture","wildlife"],300,true],
  ["Tirupati Market","Tirupati","Andhra Pradesh",["crafts","trekking"],200,false],
  ["Guntur Island Beach","Guntur","Andhra Pradesh",["museum","crafts"],40,false],
  ["Tirupati Lake","Tirupati","Andhra Pradesh",["waterfall","unique"],80,true],
  ["Nellore Railway","Nellore","Andhra Pradesh",["adventure","unique"],200,false],
  ["Visakhapatnam Temple","Visakhapatnam","Andhra Pradesh",["fort","unique"],20,true],
  ["Kadapa Cave","Kadapa","Andhra Pradesh",["crafts","culture"],100,false],
  ["Anantapur Viewpoint","Anantapur","Andhra Pradesh",["nature","waterfall"],20,true],
  ["Kadapa Island","Kadapa","Andhra Pradesh",["island","crafts"],300,true],
  ["Guntur Temple","Guntur","Andhra Pradesh",["crafts","museum"],20,true],
  ["Tirupati Ghat","Tirupati","Andhra Pradesh",["temple","unique"],80,true],
  ["Nellore Beach","Nellore","Andhra Pradesh",["rail","beach"],100,true],
  ["Rajahmundry Viewpoint","Rajahmundry","Andhra Pradesh",["festival","adventure"],80,false],
  ["Adilabad Viewpoint","Adilabad","Telangana",["island","adventure"],150,true],
  ["Hyderabad Wildlife Sanctuary","Hyderabad","Telangana",["unique","wildlife"],60,true],
  ["Suryapet Garden","Suryapet","Telangana",["food","beach"],40,true],
  ["Khammam Museum","Khammam","Telangana",["island","history"],250,true],
  ["Adilabad Island Beach","Adilabad","Telangana",["beach","festival"],150,true],
  ["Nizamabad Market","Nizamabad","Telangana",["festival","wildlife"],200,true],
  ["Mahabubnagar Wildlife Sanctuary","Mahabubnagar","Telangana",["food","waterfall"],300,true],
  ["Suryapet Falls","Suryapet","Telangana",["history","food"],80,false],
  ["Karimnagar Wildlife Sanctuary","Karimnagar","Telangana",["rail","waterfall"],200,true],
  ["Mahabubnagar Railway","Mahabubnagar","Telangana",["island","garden"],40,true],
  ["Medak Viewpoint","Medak","Telangana",["view","nature"],200,true],
  ["Nalgonda Museum","Nalgonda","Telangana",["island","spiritual"],80,true],
  ["Nizamabad Palace","Nizamabad","Telangana",["waterfall","island"],40,false],
  ["Warangal Falls","Warangal","Telangana",["waterfall","fort"],0,false],
  ["Hyderabad Tea Gardens","Hyderabad","Telangana",["island","fort"],60,false],
  ["Warangal Wildlife Sanctuary","Warangal","Telangana",["food","heritage"],100,true],
  ["Nizamabad Lake","Nizamabad","Telangana",["waterfall","festival"],0,true],
  ["Hyderabad Palace","Hyderabad","Telangana",["culture","beach"],250,false],
  ["Warangal Monument","Warangal","Telangana",["food","unique"],20,true],
  ["Cuttack Backwaters","Cuttack","Odisha",["crafts","festival"],200,true],
  ["Puri Lake","Puri","Odisha",["festival","history"],0,true],
  ["Konark Monument","Konark","Odisha",["garden","heritage"],300,true],
  ["Cuttack Cave","Cuttack","Odisha",["garden","wildlife"],20,true],
  ["Puri Railway","Puri","Odisha",["history","island"],250,true],
  ["Bhitarkanika Lake","Bhitarkanika","Odisha",["nature","temple"],100,true],
  ["Bhubaneswar Wildlife Sanctuary","Bhubaneswar","Odisha",["adventure","fort"],60,true],
  ["Heritage Site of Rourkela","Rourkela","Odisha",["beach","nature"],100,true],
  ["Konark Island","Konark","Odisha",["trekking","wildlife"],40,true],
  ["Koraput Temple","Koraput","Odisha",["unique","culture"],0,true],
  ["Heritage Site of Bhubaneswar","Bhubaneswar","Odisha",["unique","island"],150,false],
  ["Chilika Temple","Chilika","Odisha",["crafts","culture"],80,true],
  ["Bhitarkanika Island","Bhitarkanika","Odisha",["temple","museum"],40,false],
  ["Koraput Wildlife Sanctuary","Koraput","Odisha",["island","view"],20,false],
  ["Puri Backwaters","Puri","Odisha",["festival","wildlife"],250,true],
  ["Sambalpur Museum","Sambalpur","Odisha",["adventure","museum"],80,true],
  ["Koraput Island Beach","Koraput","Odisha",["garden","wildlife"],200,true],
  ["Bhubaneswar Beach","Bhubaneswar","Odisha",["crafts","temple"],100,true],
  ["Patna Viewpoint","Patna","Bihar",["festival","waterfall"],0,true],
  ["Bodh Gaya Falls","Bodh Gaya","Bihar",["crafts","fort"],100,false],
  ["Buxar Temple","Buxar","Bihar",["festival","beach"],200,true],
  ["Muzaffarpur Island","Muzaffarpur","Bihar",["adventure","rail"],40,true],
  ["Heritage Site of Darbhanga","Darbhanga","Bihar",["crafts","view"],60,true],
  ["Patna Market","Patna","Bihar",["trekking","island"],150,true],
  ["Gaya Palace","Gaya","Bihar",["waterfall","culture"],300,true],
  ["Purnia Garden","Purnia","Bihar",["spiritual","beach"],20,false],
  ["Nalanda Island","Nalanda","Bihar",["adventure","museum"],100,true],
  ["Bhagalpur Ghat","Bhagalpur","Bihar",["unique","crafts"],40,true],
  ["Muzaffarpur Railway","Muzaffarpur","Bihar",["food","spiritual"],60,true],
  ["Rajgir Lake","Rajgir","Bihar",["heritage","fort"],250,true],
  ["Purnia Ghat","Purnia","Bihar",["beach","festival"],20,true],
  ["Gaya Tea Gardens","Gaya","Bihar",["trekking","island"],150,false],
  ["Buxar Beach","Buxar","Bihar",["beach","museum"],20,false],
  ["Purnia Railway","Purnia","Bihar",["fort","beach"],250,true],
  ["Nalanda Backwaters","Nalanda","Bihar",["island","nature"],20,true],
  ["Gaya Market","Gaya","Bihar",["wildlife","museum"],60,true],
  ["Bhagalpur Monument","Bhagalpur","Bihar",["adventure","view"],60,true],
  ["Nalanda Monument","Nalanda","Bihar",["festival","history"],20,true],
  ["Chaibasa Cave","Chaibasa","Jharkhand",["beach","wildlife"],300,true],
  ["Chaibasa Temple","Chaibasa","Jharkhand",["heritage","adventure"],0,true],
  ["Hazaribagh Cave","Hazaribagh","Jharkhand",["garden","festival"],0,false],
  ["Bokaro Monument","Bokaro","Jharkhand",["crafts","unique"],200,true],
  ["Dhanbad Monument","Dhanbad","Jharkhand",["waterfall","adventure"],0,true],
  ["Daltonganj Backwaters","Daltonganj","Jharkhand",["trekking","waterfall"],60,true],
  ["Chaibasa Viewpoint","Chaibasa","Jharkhand",["museum","crafts"],100,false],
  ["Deoghar Wildlife Sanctuary","Deoghar","Jharkhand",["island","history"],20,true],
  ["Hazaribagh Island","Hazaribagh","Jharkhand",["spiritual","view"],200,true],
  ["Deoghar Museum","Deoghar","Jharkhand",["nature","unique"],150,false],
  ["Hazaribagh Market","Hazaribagh","Jharkhand",["museum","rail"],100,true],
  ["Deoghar Lake","Deoghar","Jharkhand",["island","waterfall"],200,true],
  ["Daltonganj Fort","Daltonganj","Jharkhand",["adventure","temple"],250,false],
  ["Hazaribagh Garden","Hazaribagh","Jharkhand",["rail","fort"],0,true],
  ["Netarhat Lake","Netarhat","Jharkhand",["festival","trekking"],80,true],
  ["Jamshedpur Backwaters","Jamshedpur","Jharkhand",["beach","view"],100,false],
  ["Betla Temple","Betla","Jharkhand",["temple","nature"],300,true],
  ["Betla Ghat","Betla","Jharkhand",["unique","adventure"],150,false],
  ["Bokaro Palace","Bokaro","Jharkhand",["festival","crafts"],20,true],
  ["Jamshedpur Tea Gardens","Jamshedpur","Jharkhand",["fort","museum"],250,true],
  ["Majuli Garden","Majuli","Assam",["festival","island"],150,true],
  ["Guwahati Temple","Guwahati","Assam",["beach","museum"],200,false],
  ["Majuli Island Beach","Majuli","Assam",["island","beach"],100,true],
  ["Majuli Tea Gardens","Majuli","Assam",["festival","unique"],300,true],
  ["Tinsukia Railway","Tinsukia","Assam",["history","trekking"],300,true],
  ["Sivasagar Fort","Sivasagar","Assam",["fort","museum"],20,false],
  ["Nameri Monument","Nameri","Assam",["crafts","heritage"],300,false],
  ["Jorhat Cave","Jorhat","Assam",["rail","food"],0,false],
  ["Majuli Railway","Majuli","Assam",["crafts","festival"],150,true],
  ["Tezpur Temple","Tezpur","Assam",["rail","spiritual"],60,true],
  ["Heritage Site of Sivasagar","Sivasagar","Assam",["garden","beach"],150,true],
  ["Silchar Railway","Silchar","Assam",["festival","trekking"],0,true],
  ["Tinsukia Garden","Tinsukia","Assam",["history","museum"],200,false],
  ["Dibrugarh Market","Dibrugarh","Assam",["waterfall","history"],100,true],
  ["Jorhat Island Beach","Jorhat","Assam",["trekking","culture"],60,true],
  ["Tinsukia Monument","Tinsukia","Assam",["food","unique"],80,true],
  ["Jorhat Museum","Jorhat","Assam",["rail","history"],150,false],
  ["Dibrugarh Viewpoint","Dibrugarh","Assam",["unique","nature"],80,true],
  ["Dibrugarh Island","Dibrugarh","Assam",["crafts","view"],200,true],
  ["Kohima Ghat","Kohima","North East",["view","history"],80,true],
  ["Aizawl Island Beach","Aizawl","North East",["rail","food"],60,true],
  ["Shillong Falls","Shillong","North East",["crafts","food"],0,true],
  ["Heritage Site of Ziro","Ziro","North East",["trekking","spiritual"],40,true],
  ["Shillong Market","Shillong","North East",["garden","trekking"],200,true],
  ["Heritage Site of Agartala","Agartala","North East",["unique","nature"],20,true],
  ["Shillong Temple","Shillong","North East",["wildlife","garden"],40,true],
  ["Ziro Lake","Ziro","North East",["wildlife","unique"],0,true],
  ["Agartala Cave","Agartala","North East",["festival","spiritual"],100,true],
  ["Tawang Ghat","Tawang","North East",["island","trekking"],40,false],
  ["Agartala Garden","Agartala","North East",["spiritual","museum"],40,false],
  ["Agartala Market","Agartala","North East",["heritage","museum"],80,true],
  ["Imphal Island Beach","Imphal","North East",["crafts","temple"],150,true],
  ["Aizawl Tea Gardens","Aizawl","North East",["spiritual","wildlife"],40,false],
  ["Itanagar Falls","Itanagar","North East",["heritage","view"],150,true],
  ["Tawang Palace","Tawang","North East",["museum","unique"],300,true],
  ["Agartala Wildlife Sanctuary","Agartala","North East",["food","nature"],20,false],
  ["Tawang Viewpoint","Tawang","North East",["waterfall","festival"],100,false],
  ["Korba Lake","Korba","Chhattisgarh",["history","culture"],60,true],
  ["Korba Island","Korba","Chhattisgarh",["island","fort"],20,true],
  ["Raipur Ghat","Raipur","Chhattisgarh",["island","culture"],300,true],
  ["Heritage Site of Barnawapara","Barnawapara","Chhattisgarh",["island","waterfall"],20,true],
  ["Durg Lake","Durg","Chhattisgarh",["adventure","island"],200,true],
  ["Rajnandgaon Viewpoint","Rajnandgaon","Chhattisgarh",["island","garden"],200,true],
  ["Raipur Garden","Raipur","Chhattisgarh",["rail","adventure"],0,false],
  ["Bastar Beach","Bastar","Chhattisgarh",["history","nature"],20,false],
  ["Raipur Monument","Raipur","Chhattisgarh",["garden","wildlife"],40,false],
  ["Bastar Tea Gardens","Bastar","Chhattisgarh",["waterfall","temple"],150,true],
  ["Korba Viewpoint","Korba","Chhattisgarh",["crafts","fort"],20,true],
  ["Korba Tea Gardens","Korba","Chhattisgarh",["island","beach"],60,true],
  ["Kanker Falls","Kanker","Chhattisgarh",["waterfall","fort"],40,true],
  ["Kanker Museum","Kanker","Chhattisgarh",["nature","garden"],300,true],
  ["Kanker Garden","Kanker","Chhattisgarh",["adventure","spiritual"],300,true],
  ["Rajnandgaon Island Beach","Rajnandgaon","Chhattisgarh",["nature","food"],0,false],
  ["Rajnandgaon Falls","Rajnandgaon","Chhattisgarh",["history","culture"],0,true],
  ["Korba Monument","Korba","Chhattisgarh",["food","rail"],100,true],
  ["Anjuna Monument","Anjuna","Goa",["beach","island"],60,false],
  ["Margao Palace","Margao","Goa",["nature","history"],300,true],
  ["Dudhsagar Ghat","Dudhsagar","Goa",["trekking","nature"],100,false],
  ["Heritage Site of Arambol","Arambol","Goa",["garden","crafts"],40,true],
  ["Dudhsagar Market","Dudhsagar","Goa",["history","trekking"],60,true],
  ["Margao Viewpoint","Margao","Goa",["waterfall","nature"],250,false],
  ["Margao Garden","Margao","Goa",["museum","adventure"],200,true],
  ["Baga Ghat","Baga","Goa",["culture","nature"],80,false],
  ["Colva Island Beach","Colva","Goa",["nature","adventure"],60,true],
  ["Old Goa Garden","Old Goa","Goa",["museum","unique"],0,true],
  ["Anjuna Museum","Anjuna","Goa",["trekking","food"],300,true],
  ["Dudhsagar Falls","Dudhsagar","Goa",["history","museum"],80,false],
  ["Old Goa Ghat","Old Goa","Goa",["crafts","fort"],80,true],
  ["Vagator Railway","Vagator","Goa",["trekking","waterfall"],20,false],
  ["Vagator Garden","Vagator","Goa",["fort","museum"],150,true],
  ["Colva Falls","Colva","Goa",["beach","heritage"],80,false],
  ["Old Goa Lake","Old Goa","Goa",["waterfall","wildlife"],100,true],
  ["Pahalgam Ghat","Pahalgam","Jammu & Kashmir",["trekking","wildlife"],250,true],
  ["Doda Temple","Doda","Jammu & Kashmir",["adventure","nature"],0,false],
  ["Pahalgam Falls","Pahalgam","Jammu & Kashmir",["adventure","beach"],0,true],
  ["Doda Island","Doda","Jammu & Kashmir",["fort","nature"],300,false],
  ["Jammu City Fort","Jammu City","Jammu & Kashmir",["heritage","history"],250,false],
  ["Srinagar Fort","Srinagar","Jammu & Kashmir",["island","view"],250,true],
  ["Srinagar Railway","Srinagar","Jammu & Kashmir",["garden","wildlife"],20,true],
  ["Doda Viewpoint","Doda","Jammu & Kashmir",["food","culture"],300,true],
  ["Sonamarg Palace","Sonamarg","Jammu & Kashmir",["temple","adventure"],100,false],
  ["Jammu City Cave","Jammu City","Jammu & Kashmir",["food","crafts"],80,true],
  ["Srinagar Beach","Srinagar","Jammu & Kashmir",["temple","crafts"],150,false],
  ["Sonamarg Cave","Sonamarg","Jammu & Kashmir",["spiritual","island"],0,true],
  ["Leh Cave","Leh","Jammu & Kashmir",["trekking","view"],0,true],
  ["Kargil Ghat","Kargil","Jammu & Kashmir",["rail","nature"],40,true],
  ["Srinagar Garden","Srinagar","Jammu & Kashmir",["rail","beach"],150,true],
  ["Kargil Market","Kargil","Jammu & Kashmir",["rail","food"],300,false],
  ["Heritage Site of Doda","Doda","Jammu & Kashmir",["temple","beach"],20,true],
  ["Srinagar Museum","Srinagar","Jammu & Kashmir",["garden","food"],20,true],
  ["Anantnag Island Beach","Anantnag","Jammu & Kashmir",["festival","temple"],100,true],
  ["Ambala Island","Ambala","Haryana",["trekking","food"],100,false],
  ["Faridabad Market","Faridabad","Haryana",["rail","temple"],20,true],
  ["Karnal Beach","Karnal","Haryana",["adventure","view"],40,false],
  ["Kurukshetra Tea Gardens","Kurukshetra","Haryana",["museum","fort"],20,true],
  ["Gurugram Monument","Gurugram","Haryana",["waterfall","fort"],80,true],
  ["Kurukshetra Beach","Kurukshetra","Haryana",["wildlife","garden"],200,false],
  ["Panipat Fort","Panipat","Haryana",["adventure","fort"],250,true],
  ["Hisar Island Beach","Hisar","Haryana",["museum","temple"],0,true],
  ["Faridabad Tea Gardens","Faridabad","Haryana",["adventure","history"],60,true],
  ["Yamunanagar Viewpoint","Yamunanagar","Haryana",["adventure","wildlife"],150,true],
  ["Faridabad Monument","Faridabad","Haryana",["trekking","adventure"],100,true],
  ["Karnal Lake","Karnal","Haryana",["festival","crafts"],60,false],
  ["Panipat Viewpoint","Panipat","Haryana",["unique","heritage"],150,true],
  ["Hisar Tea Gardens","Hisar","Haryana",["museum","waterfall"],100,false],
  ["Hisar Viewpoint","Hisar","Haryana",["unique","museum"],300,true],
  ["Heritage Site of Yamunanagar","Yamunanagar","Haryana",["wildlife","temple"],100,true],
  ["Yamunanagar Cave","Yamunanagar","Haryana",["food","museum"],150,true],
  ["Faridabad Wildlife Sanctuary","Faridabad","Haryana",["spiritual","rail"],60,true],
  ["Rohtak Fort","Rohtak","Haryana",["waterfall","culture"],200,true],
  ["Hyderabad Beach","Hyderabad","Telangana_extra",["garden","trekking"],40,true],
  ["Karimnagar Palace","Karimnagar","Telangana_extra",["beach","garden"],150,true],
  ["Warangal Island Beach","Warangal","Telangana_extra",["trekking","rail"],150,false],
  ["Hyderabad Temple","Hyderabad","Telangana_extra",["fort","history"],300,true],
  ["Karimnagar Falls","Karimnagar","Telangana_extra",["fort","wildlife"],300,true],
  ["Hyderabad Tea Gardens","Hyderabad","Telangana_extra",["museum","garden"],20,true],
  ["Warangal Wildlife Sanctuary","Warangal","Telangana_extra",["temple","waterfall"],300,true],
  ["Warangal Fort","Warangal","Telangana_extra",["trekking","spiritual"],80,false],
  ["Karimnagar Museum","Karimnagar","Telangana_extra",["beach","fort"],80,true],
  ["Warangal Garden","Warangal","Telangana_extra",["island","trekking"],100,false],
  ["Karimnagar Island","Karimnagar","Telangana_extra",["waterfall","museum"],20,true],
  ["Hyderabad Falls","Hyderabad","Telangana_extra",["island","wildlife"],250,true],
  ["Warangal Ghat","Warangal","Telangana_extra",["garden","waterfall"],60,false],
  ["Hyderabad Market","Hyderabad","Telangana_extra",["wildlife","garden"],150,true],
  ["Hyderabad Island Beach","Hyderabad","Telangana_extra",["culture","waterfall"],300,false],
  ["Hyderabad Museum","Hyderabad","Telangana_extra",["history","wildlife"],100,true],
  ["Tsomgo Tea Gardens","Tsomgo","Sikkim",["festival","temple"],300,true],
  ["Ravangla Wildlife Sanctuary","Ravangla","Sikkim",["waterfall","festival"],40,true],
  ["Tsomgo Cave","Tsomgo","Sikkim",["adventure","beach"],100,true],
  ["Lachung Valley Monument","Lachung Valley","Sikkim",["spiritual","wildlife"],100,true],
  ["Lachen Tea Gardens","Lachen","Sikkim",["garden","festival"],40,false],
  ["Zuluk Market","Zuluk","Sikkim",["trekking","history"],40,true],
  ["Yuksom Monument","Yuksom","Sikkim",["beach","wildlife"],100,false],
  ["Tsomgo Temple","Tsomgo","Sikkim",["fort","heritage"],200,true],
  ["Lachung Valley Tea Gardens","Lachung Valley","Sikkim",["history","island"],200,false],
  ["Yuksom Backwaters","Yuksom","Sikkim",["waterfall","trekking"],40,true],
  ["Tsomgo Fort","Tsomgo","Sikkim",["food","unique"],0,true],
  ["Lachung Valley Ghat","Lachung Valley","Sikkim",["unique","wildlife"],200,false],
  ["Lachen Railway","Lachen","Sikkim",["spiritual","rail"],20,true],
  ["Lachen Wildlife Sanctuary","Lachen","Sikkim",["history","nature"],200,true],
  ["Zuluk Museum","Zuluk","Sikkim",["crafts","food"],80,true],
  ["Yuksom Palace","Yuksom","Sikkim",["fort","adventure"],200,true],
  ["Lachung Valley Garden","Lachung Valley","Sikkim",["rail","fort"],300,false],
  ["Lachung Island Beach","Lachung","Sikkim",["beach","culture"],60,true],
  ["Tsomgo Wildlife Sanctuary","Tsomgo","Sikkim",["history","view"],300,true],
  ["Ravangla Monument","Ravangla","Sikkim",["unique","rail"],80,true],
  ["Auroville Backwaters","Auroville","Puducherry",["nature","view"],40,true],
  ["Auroville Viewpoint","Auroville","Puducherry",["museum","food"],150,false],
  ["Auroville Cave","Auroville","Puducherry",["crafts","view"],150,false],
  ["Mahe Beach","Mahe","Puducherry",["crafts","adventure"],150,true],
  ["Karaikal Island","Karaikal","Puducherry",["trekking","museum"],300,true],
  ["Pondicherry Island","Pondicherry","Puducherry",["crafts","fort"],20,false],
  ["Heritage Site of Karaikal","Karaikal","Puducherry",["history","rail"],40,false],
  ["Heritage Site of Little Andaman","Little Andaman","Andaman & Nicobar Islands",["nature","crafts"],20,false],
  ["Port Blair Museum","Port Blair","Andaman & Nicobar Islands",["wildlife","waterfall"],200,true],
  ["Ross Island Garden","Ross Island","Andaman & Nicobar Islands",["beach","unique"],40,true],
  ["Port Blair Wildlife Sanctuary","Port Blair","Andaman & Nicobar Islands",["view","adventure"],100,true],
  ["Port Blair Tea Gardens","Port Blair","Andaman & Nicobar Islands",["crafts","unique"],60,false],
  ["Barren Island Beach","Barren Island","Andaman & Nicobar Islands",["spiritual","heritage"],60,false],
  ["Port Blair Viewpoint","Port Blair","Andaman & Nicobar Islands",["rail","food"],250,false],
  ["Port Blair Fort","Port Blair","Andaman & Nicobar Islands",["museum","spiritual"],150,true],
  ["Kadmat Beach","Kadmat","Lakshadweep",["food","temple"],20,true],
  ["Heritage Site of Kavaratti","Kavaratti","Lakshadweep",["fort","unique"],40,false],
  ["Agatti Viewpoint","Agatti","Lakshadweep",["adventure","island"],300,true],
  ["Minicoy Market","Minicoy","Lakshadweep",["waterfall","fort"],60,true],
  ["Kadmat Island Beach","Kadmat","Lakshadweep",["waterfall","culture"],20,true],
  ["Agatti Museum","Agatti","Lakshadweep",["rail","temple"],100,false],
  ["Bangaram Viewpoint","Bangaram","Lakshadweep",["food","view"],20,true],
  ["Minicoy Island Beach","Minicoy","Lakshadweep",["festival","crafts"],80,true],
  ["Chandigarh Garden","Chandigarh","Chandigarh",["island","festival"],250,true],
  ["Chandigarh Monument","Chandigarh","Chandigarh",["crafts","nature"],60,false],
  ["Chandigarh Museum","Chandigarh","Chandigarh",["food","trekking"],300,true],
  ["Chandigarh Wildlife Sanctuary","Chandigarh","Chandigarh",["museum","beach"],150,false],
  ["Chandigarh Ghat","Chandigarh","Chandigarh",["wildlife","trekking"],20,true],
  ["Chandigarh Fort","Chandigarh","Chandigarh",["view","culture"],0,true],
  ["Chandigarh Railway","Chandigarh","Chandigarh",["unique","island"],150,false],
  ["Chandigarh Beach","Chandigarh","Chandigarh",["crafts","history"],250,true],
];


/* ------------------------------------------------------------
   Build INDIA_PLACES (exactly 500 entries)
------------------------------------------------------------ */
const INDIA_PLACES = (() => {
  const out = [];
  const total = 500;
  const len = PLACE_TUPLES.length;

  let id = 1, i = 0;

  while (id <= total) {
    const t = PLACE_TUPLES[i % len];
    const loop = Math.floor(i / len);

    // If looping, create slight variations
    let [name, city, state, tags, cost, eco] = t;

    if (loop > 0) {
      const suffixes = [
        " (North)", " (South)", " (East)", " (West)",
        " - Heritage Zone", " (Old Town)", " Viewpoint"
      ];
      const sfx = suffixes[(id + i) % suffixes.length];
      name = name + sfx;

      cost = Math.max(0, cost + (loop * 7 % 40));
    }

    out.push(mkPlace(id, [name, city, state, tags, cost, eco]));
    id++; i++;
  }

  return out;
})();

/* ------------------------------------------------------------
   Expose globally for script.js
------------------------------------------------------------ */
if (typeof window !== "undefined") {
  window.INDIA_PLACES = INDIA_PLACES;
}




