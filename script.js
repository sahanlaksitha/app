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
