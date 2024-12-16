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

 // Admin Chat ID and Bot Token
    const ADMIN_CHAT_ID = "1258152672"; // Replace with your admin or group chat ID
    const BOT_TOKEN = "YOUR_BOT_TOKEN"; // Replace with your actual bot token

    // Event Listener for Feedback Button
    document.getElementById("send-feedback-btn").addEventListener("click", sendFeedback);

    // Send Feedback Function
    function sendFeedback() {
      const feedbackInput = document.getElementById("feedback-input").value.trim();

      if (!feedbackInput) {
        showModal("Please write some feedback before sending.");
        return;
      }

      // Construct message with user details
      const message = `Feedback from ${user.first_name} ${user.last_name || ""} (@${user.username || "N/A"} - ${user.id}):\n\n${feedbackInput}`;

      // Send feedback to Telegram Bot API
      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: ADMIN_CHAT_ID,
          text: message
        }),
      })
        .then(response => {
          if (response.ok) {
            showModal("Thank you! Your feedback has been sent.");
            document.getElementById("feedback-input").value = ""; // Clear input
          } else {
            showModal("Error sending feedback. Please try again later.");
          }
        })
        .catch(error => {
          console.error("Error:", error);
          showModal("Error sending feedback. Please try again.");
        });
    }

    // Show Modal Function
    function showModal(message) {
      const modal = document.getElementById("feedback-modal");
      const modalMessage = document.getElementById("modal-message");

      modalMessage.textContent = message;
      modal.style.display = "flex";
    }

    // Close Modal Function
    function closeModal() {
      document.getElementById("feedback-modal").style.display = "none";
    }




// Expand WebApp
tg.expand();
