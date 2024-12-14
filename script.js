// Initialize Telegram Web App
const tg = window.Telegram.WebApp;

// User details
const user = tg.initDataUnsafe?.user || {
  first_name: "User",
  username: "username",
  id: "123456",
  photo_url: null,
};

// Populate User Details
document.getElementById("user-name").innerText = `Hello, ${user.first_name}!`;
document.getElementById("user-username").innerText = `Username: @${user.username || "N/A"}`;
document.getElementById("user-id").innerText = `User ID: ${user.id}`;
if (user.photo_url) {
  document.getElementById("profile-pic").src = user.photo_url;
}

// Menu Navigation Logic
const sections = document.querySelectorAll(".section");
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.getAttribute("data-target");

    // Switch Active Section
    sections.forEach((section) => {
      section.classList.remove("active");
    });
    document.getElementById(target).classList.add("active");

    // Update Active Menu Item
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
  });
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
