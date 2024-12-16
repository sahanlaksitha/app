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

function sendFeedback() {
  const feedbackInput = document.getElementById("feedback-input").value.trim();

  if (!feedbackInput) {
    showModal("Please write some feedback before sending.");
    return;
  }

  // Admin chat ID where feedback will be sent
  const ADMIN_CHAT_ID = "1258152672"; // Replace with your admin or group chat ID

  // Send the feedback message to your bot
  fetch(`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text: `Feedback from ${user.first_name} (${user.username || 'N/A'} - ${user.id}):\n\n${feedbackInput}`,
    }),
  })
  .then(response => {
    if (response.ok) {
      showModal("Thank you for your feedback!");
      document.getElementById("feedback-input").value = ""; // Clear the textarea
    } else {
      showModal("Something went wrong. Please try again later.");
    }
  })
  .catch(error => {
    showModal("Something went wrong. Please try again later.");
  });
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
