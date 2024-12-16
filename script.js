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
    .then((res) => res.json())
    .then(() => {
      alert("Feedback sent successfully!");
      document.getElementById("feedback-text").value = "";
    })
    .catch(() => {
      alert("Error sending feedback. Try again later.");
    });
});




  // Fetch channel messages when Wall is shown
  if (pageId === "wall") {
    fetchChannelMessages();
  }
}

// Fetch messages from Telegram channel using Bot API
async function fetchChannelMessages() {
  const botToken = '8080972949:AAHeqF2352do546naypN2FS-p_BNagw2keU'; // Replace with your bot token
  const chatId = '@tipstream'; // Replace with your channel username
  const url = `https://api.telegram.org/bot${botToken}/getUpdates`;

  const messagesContainer = document.getElementById("channel-messages");
  messagesContainer.innerHTML = "Loading messages...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const messages = data.result
      .filter((update) => update.message && update.message.chat.username === chatId)
      .map((update) => update.message.text);

    if (messages.length > 0) {
      messagesContainer.innerHTML = messages
        .map((msg) => `<p>${msg}</p>`)
        .join("");
    } else {
      messagesContainer.innerHTML = "No messages found.";
    }
  } catch (error) {
    console.error("Error fetching channel messages:", error);
    messagesContainer.innerHTML = "Failed to load messages.";
  }
}





// Expand WebApp
tg.expand();
