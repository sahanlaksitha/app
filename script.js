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
    

  // Simulate feedback submission (you can replace this with your API logic)
  showModal("Thank you for your feedback!");
  document.getElementById("feedback-input").value = ""; // Clear the textarea
}

// Function to show the custom modal
function showModal(message) {
  const modal = document.getElementById("feedback-modal");
  const modalMessage = document.getElementById("modal-message");

  modalMessage.textContent = message;
  modal.style.display = "flex";
}

// Function to close the custom modal
function closeModal() {
  const modal = document.getElementById("feedback-modal");
  modal.style.display = "none";
}










// Expand WebApp
tg.expand();
