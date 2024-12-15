document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".content-section");

  // Navigation click handler
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      // Update active menu item
      navItems.forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");

      // Show related section
      const targetSection = item.getAttribute("href").substring(1);
      sections.forEach((section) => {
        section.classList.remove("active");
        if (section.id === targetSection) {
          section.classList.add("active");
        }
      });
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


// Feedback Logic
const feedbackButton = document.getElementById("send-feedback");
const feedbackInput = document.getElementById("feedback-input");

feedbackButton.addEventListener("click", async () => {
  const feedback = feedbackInput.value.trim();

  if (!feedback) {
    alert("Please write some feedback.");
    return;
  }

  // Send feedback via Telegram Bot API
  const response = await fetch(
    `https://api.telegram.org/bot8080972949:AAHeqF2352do546naypN2FS-p_BNagw2keU/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: "1258152672",
        text: `Feedback from ${user.first_name} (@${user.username} - ${user.id}):\n\n${feedback}`,
      }),
    }
  );

  if (response.ok) {
    alert("Feedback sent successfully!");
    feedbackInput.value = "";
  } else {
    alert("Something went wrong, please try again.");
  }
});
