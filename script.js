// Initialize Telegram Web App
const tg = window.Telegram.WebApp;

// Parse the user's initial data
const initData = tg.initDataUnsafe;
const user = initData.user;

// Display user details and profile picture
const userDetailsDiv = document.getElementById("user-details");

// Check for profile photo (Telegram provides photo_url only in certain environments)
const profilePic = user.photo_url
  ? `<img src="${user.photo_url}" alt="Profile Picture">`
  : `<img src="https://via.placeholder.com/100" alt="Default Profile Picture">`;

userDetailsDiv.innerHTML = `
  ${profilePic}
  <div class="user-text">
    <h2>Hello, ${user.first_name} ${user.last_name || ''}!</h2>
    <p>Username: @${user.username || 'N/A'}</p>
    <p>User ID: ${user.id}</p>
  </div>
`;

// Feedback button logic
const feedbackButton = document.getElementById("send-feedback");
const feedbackInput = document.getElementById("feedback");

feedbackButton.addEventListener("click", async () => {
  const feedbackMessage = feedbackInput.value.trim();

  if (!feedbackMessage) {
    alert("Please write some feedback before sending.");
    return;
  }

  // Admin chat ID where feedback will be sent
  const ADMIN_CHAT_ID = "1258152672"; // Replace with your admin or group chat ID

  // Send the feedback message to your bot
  const response = await fetch(`https://api.telegram.org/bot8080972949:AAHeqF2352do546naypN2FS-p_BNagw2keU/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text: `Feedback from ${user.first_name} (${user.username || 'N/A'} - ${user.id}):\n\n${feedbackMessage}`,
    }),
  });

  if (response.ok) {
    alert("Thank you for your feedback! It has been sent to the admin.");
    feedbackInput.value = ""; // Clear the input
  } else {
    alert("Something went wrong. Please try again later.");
  }
});

// Show Telegram's built-in buttons (e.g., Close)
tg.expand();
