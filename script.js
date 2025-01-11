/* script.js */

/**
 * Dynamically update the Day dropdown (1-31, 1-30, 1-28)
 * based on the selected Month.
 */
function updateDays() {
  const month = parseInt(document.getElementById("month").value);
  const daySelect = document.getElementById("day");

  // Clear out the existing <option> elements
  daySelect.innerHTML = '<option value="" disabled selected>Select day</option>';

  // Decide how many days in the selected month
  let daysInMonth;
  switch (month) {
    case 1:  // January
    case 3:  // March
    case 5:  // May
    case 7:  // July
    case 8:  // August
    case 10: // October
    case 12: // December
      daysInMonth = 31;
      break;
    case 4:  // April
    case 6:  // June
    case 9:  // September
    case 11: // November
      daysInMonth = 30;
      break;
    case 2:  // February
      // You can use 29 if you want to approximate leap years, 
      // or 28 to keep it simple.
      daysInMonth = 28;
      break;
    default:
      daysInMonth = 31;
  }

  // Populate the Day dropdown with the correct number of days
  for (let i = 1; i <= daysInMonth; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }
}

/**
 * Calculate the user's zodiac sign and display the result in a popup (modal).
 */
function calculateZodiac() {
  const name = document.getElementById("name").value.trim();
  const month = parseInt(document.getElementById("month").value);
  const day = parseInt(document.getElementById("day").value);

  if (!name || isNaN(month) || isNaN(day)) {
    alert("Please enter valid information for all fields.");
    return;
  }

  // Determine the zodiac sign
  const zodiacSign = getZodiacSign(month, day);

  // Get zodiac details: meaning, personality, compatibility
  const { meaning, personality, compatibilitySign, compatibilityDesc } = getZodiacDetails(zodiacSign);

  // Build the HTML content for the modal
  const modalContent = `
    <h2>Hello, ${name}!</h2>
    <img src="${getZodiacImage(zodiacSign)}" alt="${zodiacSign}" class="zodiac-image">
    <p><strong>Your Zodiac Sign:</strong> ${zodiacSign} (${getDateRange(zodiacSign)})</p>
    <p><strong>Meaning:</strong> ${meaning}</p>
    <p><strong>Your Personality:</strong> ${personality}</p>
    <p><strong>Most Compatible With:</strong> ${compatibilitySign} (${getDateRange(compatibilitySign)})<br/>
       ${compatibilityDesc}</p>
  `;

  // Insert this content into the modal-result div
  document.getElementById("modal-result").innerHTML = modalContent;

  // Open the modal
  openModal();
}

/**
 * Returns the zodiac sign name based on month and day.
 */
function getZodiacSign(month, day) {
  // For reference:
  // Aries: March 21 - April 19
  // Taurus: April 20 - May 20
  // Gemini: May 21 - June 20
  // Cancer: June 21 - July 22
  // Leo: July 23 - August 22
  // Virgo: August 23 - September 22
  // Libra: September 23 - October 22
  // Scorpio: October 23 - November 21
  // Sagittarius: November 22 - December 21
  // Capricorn: December 22 - January 19
  // Aquarius: January 20 - February 18
  // Pisces: February 19 - March 20

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "Aries";
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "Taurus";
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return "Gemini";
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return "Cancer";
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "Leo";
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "Virgo";
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return "Libra";
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return "Scorpio";
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "Sagittarius";
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "Capricorn";
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "Aquarius";
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return "Pisces";
  } else {
    return "Unknown";
  }
}

/**
 * Returns the date range for a given zodiac sign.
 */
function getDateRange(sign) {
  const dateRanges = {
    "Aries": "March 21 - April 19",
    "Taurus": "April 20 - May 20",
    "Gemini": "May 21 - June 20",
    "Cancer": "June 21 - July 22",
    "Leo": "July 23 - August 22",
    "Virgo": "August 23 - September 22",
    "Libra": "September 23 - October 22",
    "Scorpio": "October 23 - November 21",
    "Sagittarius": "November 22 - December 21",
    "Capricorn": "December 22 - January 19",
    "Aquarius": "January 20 - February 18",
    "Pisces": "February 19 - March 20",
    "Unknown": "N/A"
  };

  return dateRanges[sign] || "N/A";
}

/**
 * Returns details about a zodiac sign: meaning, personality, compatibility.
 */
function getZodiacDetails(sign) {
  const zodiacInfo = {
    "Aries": {
      meaning: "The Ram — courageous and energetic",
      personality: "Impulsive, passionate, natural-born leader.",
      compatibilitySign: "Leo",
      compatibilityDesc: "You both share a fiery passion and high energy."
    },
    "Taurus": {
      meaning: "The Bull — practical and patient",
      personality: "Dependable, strong-willed, appreciates beauty and comfort.",
      compatibilitySign: "Virgo",
      compatibilityDesc: "Both value stability and consistency in relationships."
    },
    "Gemini": {
      meaning: "The Twins — expressive and quick-witted",
      personality: "Adaptable, curious, loves to chat and learn new things.",
      compatibilitySign: "Libra",
      compatibilityDesc: "Both are social, intellectual, and appreciate good conversation."
    },
    "Cancer": {
      meaning: "The Crab — deeply intuitive and sentimental",
      personality: "Nurturing, caring, family-oriented, sometimes moody.",
      compatibilitySign: "Scorpio",
      compatibilityDesc: "You share emotional intensity and a desire for security."
    },
    "Leo": {
      meaning: "The Lion — dramatic and outgoing",
      personality: "Confident, generous, loves the spotlight and admiration.",
      compatibilitySign: "Aries",
      compatibilityDesc: "Both are passionate and can motivate each other."
    },
    "Virgo": {
      meaning: "The Virgin — analytical and detail-oriented",
      personality: "Hard-working, practical, values organization and cleanliness.",
      compatibilitySign: "Taurus",
      compatibilityDesc: "You share a grounded, stable approach to life."
    },
    "Libra": {
      meaning: "The Scales — diplomatic and gracious",
      personality: "Charming, fair-minded, seeks balance and harmony.",
      compatibilitySign: "Gemini",
      compatibilityDesc: "Your shared curiosity and sociability create a natural spark."
    },
    "Scorpio": {
      meaning: "The Scorpion — mysterious and passionate",
      personality: "Intense, loyal, values honesty, can be secretive at times.",
      compatibilitySign: "Cancer",
      compatibilityDesc: "Both are deeply emotional and connect on a profound level."
    },
    "Sagittarius": {
      meaning: "The Archer — optimistic and freedom-loving",
      personality: "Adventurous, open-minded, loves exploring and learning.",
      compatibilitySign: "Aries",
      compatibilityDesc: "You both share an energetic, enthusiastic approach to life."
    },
    "Capricorn": {
      meaning: "The Goat — ambitious and disciplined",
      personality: "Responsible, disciplined, values hard work and tradition.",
      compatibilitySign: "Taurus",
      compatibilityDesc: "You share practicality, persistence, and strong determination."
    },
    "Aquarius": {
      meaning: "The Water Bearer — innovative and independent",
      personality: "Progressive, creative, values freedom and humanitarian causes.",
      compatibilitySign: "Gemini",
      compatibilityDesc: "You both love variety, intellectual pursuits, and new ideas."
    },
    "Pisces": {
      meaning: "The Fish — empathetic and artistic",
      personality: "Compassionate, imaginative, can be dreamy and intuitive.",
      compatibilitySign: "Scorpio",
      compatibilityDesc: "You share emotional depth and an intuitive connection."
    },
    "Unknown": {
      meaning: "Unknown",
      personality: "Date is out of typical zodiac range or invalid.",
      compatibilitySign: "N/A",
      compatibilityDesc: "N/A"
    }
  };

  return zodiacInfo[sign];
}

/**
 * Return the image URL for each zodiac sign.
 * You can replace these URLs with your own images or local image paths.
 */
function getZodiacImage(sign) {
  const zodiacImages = {
    "Aries": "images/aries.png",
    "Taurus": "images/taurus.png",
    "Gemini": "images/gemini.png",
    "Cancer": "images/cancer.png",
    "Leo": "images/leo.png",
    "Virgo": "images/virgo.png",
    "Libra": "images/libra.png",
    "Scorpio": "images/scorpio.png",
    "Sagittarius": "images/sagittarius.png",
    "Capricorn": "images/capricorn.png",
    "Aquarius": "images/aquarius.png",
    "Pisces": "images/pisces.png",
    "Unknown": "images/unknown.png"
  };



  return zodiacImages[sign] || zodiacImages["Unknown"];
}

/**
 * Display the modal.
 */
function openModal() {
  document.getElementById("modal").style.display = "block";
}

/**
 * Close the modal, then clear the form fields.
 */
function closeModal() {
  // Hide the modal
  document.getElementById("modal").style.display = "none";

  // Reset the form fields
  document.getElementById("name").value = "";
  document.getElementById("month").value = "";
  
  // Clear the days dropdown
  const daySelect = document.getElementById("day");
  daySelect.innerHTML = '<option value="" disabled selected>Select day</option>';
}

// =========================
// Starry Background Animation
// =========================

let stars = [];

function setup() {
  // Create a canvas that covers the entire viewport
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Position the canvas behind other elements
  canvas.style('pointer-events', 'none'); // Allow clicks to pass through the canvas

  // Initialize stars
  for (let i = 0; i < 100; i++) { // Reduced number for subdued effect
    stars.push(new Star());
  }
}

function draw() {
  // Draw a fully opaque background to eliminate streaks
  background(10, 0, 16); // Near Black with a Touch of Purple (#0A0010)

  // Update and display each star
  for (let star of stars) {
    star.update();
    star.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Star class definition
class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.brightness = random(150, 255); // Increased minimum brightness for better visibility
    this.twinkleSpeed = random(0.005, 0.02);
    this.twinklePhase = random(TWO_PI);
    
    // Initialize movement velocities for subtle movement
    this.vx = random(-0.04, 0.04); // Slightly faster horizontal movement
    this.vy = random(-0.04, 0.04); // Slightly faster vertical movement
  }

  update() {
    // Update brightness for twinkling effect
    this.brightness = map(sin(this.twinklePhase), -1, 1, 150, 255); // Adjusted range to maintain visibility
    this.twinklePhase += this.twinkleSpeed;

    // Update position for subtle movement
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around the edges to keep stars within the viewport
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  show() {
    noStroke();
    fill(this.brightness); // White stars
    ellipse(this.x, this.y, this.size, this.size);
  }
}
