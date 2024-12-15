document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".content-section");

  // Function to handle navigation clicks
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all nav items
      navItems.forEach((nav) => nav.classList.remove("active"));

      // Add active class to the clicked nav item
      item.classList.add("active");

      // Show the corresponding section
      const targetId = item.getAttribute("href").substring(1);
      sections.forEach((section) => {
        section.classList.remove("active");
        if (section.id === targetId) {
          section.classList.add("active");
        }
      });
    });
  });

  // Optional: Telegram Web App user details initialization
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe.user;

  if (user) {
    document.getElementById("user-name").textContent = `Hello, ${user.first_name}!`;
    document.getElementById("user-username").textContent = `Username: @${user.username || "N/A"}`;
    document.getElementById("user-photo").src = user.photo_url || "https://via.placeholder.com/80";
  }
});


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
      text: `Feedback from ${user.first_name} (@${user.username} - ${user.id}):\n\n${feedback}`,
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
