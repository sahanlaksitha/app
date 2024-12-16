// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// User Details
const user = tg.initDataUnsafe?.user || {};
const userDetailsDiv = document.getElementById("user-details");

// Set User Details
const profilePic = user.photo_url || "https://via.placeholder.com/100";
document.getElementById("profile-picture").src = profilePic;

userDetailsDiv.querySelector(".user-info").innerHTML = `
  <p><strong>Name:</strong> ${user.first_name || "N/A"} ${user.last_name || ""}</p>
  <p><strong>Username:</strong> @${user.username || "N/A"}</p>
  <p><strong>ID:</strong> ${user.id || "N/A"}</p>
`;

function showPage(pageId, clickedElement) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach((page) => (page.style.display = 'none'));
  
  // Show the selected page
  document.getElementById(pageId).style.display = 'block';

  // Update active class on navigation menu
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item) => item.classList.remove('active'));
  clickedElement.classList.add('active');
  
  // Fetch channel messages when Wall is selected
  if (pageId === "wall") {
    fetchChannelMessages();
  }
}


// Feedback Button Logic
document.getElementById("send-feedback").addEventListener("click", () => {
  const feedbackText = document.getElementById("feedback-text").value.trim();

  if (!feedbackText) {
    alert("Please write feedback before sending.");
    return;
  }

 // Send Feedback to Bot (Replace with your bot's API and chat ID)
  const ADMIN_CHAT_ID = "1258152672";
  const BOT_TOKEN = "8080972949:AAHeqF2352do546naypN2FS-p_BNagw2keU";
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

