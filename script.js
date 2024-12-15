// Initialize Telegram WebApp

Here's the full professional version of your Telegram WebApp with a modern and clean look. It includes a dark theme, well-structured layout, smooth page switching, responsive design, and properly styled sections.

Key Features
Dark theme with Telegram blue highlights.
Modern bottom navigation with professional icons.
Smooth page switching using JavaScript.
Responsive design for different screen sizes.
Clean layout for Home, Community, and Feedback sections.
User details are fetched and displayed using Telegram WebApp API.
HTML (index.html)
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Telegram Web App</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
  <!-- Header (Home Page Only) -->
  <header id="header">
    <h1>Welcome to Our App</h1>
  </header>

  <!-- Pages -->
  <main>
    <!-- Home Page -->
    <section id="home" class="page active">
      <h2>Home</h2>
      <div id="user-details" class="user-details">
        <p>Loading user details...</p>
      </div>
    </section>

    <!-- Community Page -->
    <section id="community" class="page">
      <h2>Community</h2>
      <p>
        Join our channels:
      </p>
      <div class="community-links">
        <a href="https://t.me/tipstream" target="_blank" class="community-link">
          <img src="img/channel-icon.png" alt="Channel Icon">
          <span>TipStream Channel</span>
        </a>
        <a href="https://t.me/tipstreamgroup" target="_blank" class="community-link">
          <img src="img/group-icon.png" alt="Group Icon">
          <span>TipStream Group</span>
        </a>
      </div>
    </section>

    <!-- Feedback Page -->
    <section id="feedback" class="page">
      <h2>Feedback</h2>
      <textarea id="feedback-text" placeholder="Write your feedback here..."></textarea>
      <button id="send-feedback">Send Feedback</button>
    </section>
  </main>

  <!-- Bottom Navigation -->
  <nav class="bottom-nav">
    <a href="#home" class="nav-item active" onclick="showPage('home', this)">
      <i class="fa-solid fa-house"></i><span>Home</span>
    </a>
    <a href="#community" class="nav-item" onclick="showPage('community', this)">
      <i class="fa-solid fa-users"></i><span>Community</span>
    </a>
    <a href="#feedback" class="nav-item" onclick="showPage('feedback', this)">
      <i class="fa-solid fa-comment"></i><span>Feedback</span>
    </a>
  </nav>

  <script src="script.js"></script>
</body>
</html>
CSS (style.css)
css
Copy code
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Body */
body {
  font-family: 'Arial', sans-serif;
  background-color: #121212;
  color: #ffffff;
  text-align: center;
  margin-bottom: 60px; /* For bottom navigation */
}

/* Header */
header {
  background-color: #0088cc;
  color: #ffffff;
  padding: 15px 0;
  font-size: 1.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

/* Pages */
.page {
  display: none;
  padding: 20px;
}

.page.active {
  display: block;
}

/* User Details */
.user-details {
  margin: 20px auto;
  background-color: #1f1f1f;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}

/* Feedback Section */
textarea {
  width: 100%;
  height: 100px;
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  font-size: 1rem;
}

button {
  background-color: #0088cc;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #0077aa;
}

/* Community Links */
.community-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px auto;
  align-items: center;
}

.community-link {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #1f1f1f;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  text-decoration: none;
  color: #ffffff;
}

.community-link img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.community-link:hover {
  background-color: #333333;
}

/* Bottom Navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #1f1f1f;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
}

.nav-item {
  color: #aaa;
  text-decoration: none;
  text-align: center;
}

.nav-item i {
  font-size: 1.5rem;
}

.nav-item span {
  display: block;
  font-size: 0.8rem;
}

.nav-item.active {
  color: #0088cc;
}

.nav-item:hover {
  color: #0088cc;
}
JavaScript (script.js)
javascript
Copy code
// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Display User Details on Home Page
const userDetailsDiv = document.getElementById("user-details");
const user = tg.initDataUnsafe?.user;

if (user) {
  userDetailsDiv.innerHTML = `
    <p><strong>Name:</strong> ${user.first_name} ${user.last_name || ""}</p>
    <p><strong>Username:</strong> @${user.username || "N/A"}</p>
    <p><strong>ID:</strong> ${user.id}</p>
  `;
} else {
  userDetailsDiv.innerHTML = `<p>User details not available.</p>`;
}

// Page Switching Logic
function showPage(pageId, clickedElement) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });
  clickedElement.classList.add("active");
}
// Feedback Button Logic
document.getElementById("send-feedback").addEventListener("click", () => {
  const feedbackText = document.getElementById("feedback-text").value.trim();

  if (!feedbackText) {
    alert("Please write feedback before sending.");
    return;
  }

  alert("Thank you for your feedback!");
  document.getElementById("feedback-text").value = "";
});



  // Send Feedback to Bot (Replace with your bot's API and chat ID)
  const ADMIN_CHAT_ID = "YOUR_ADMIN_CHAT_ID";
  const BOT_TOKEN = "YOUR_BOT_TOKEN";
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text: `Feedback from ${user?.first_name || "Anonymous"}:\n\n${feedbackText}`,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Feedback sent successfully!");
      document.getElementById("feedback-text").value = "";
    })
    .catch(() => {
      alert("Error sending feedback. Try again later.");
    });
});

// Expand WebApp
tg.expand();
