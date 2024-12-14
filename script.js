// Initialize Telegram Web App
const tg = window.Telegram.WebApp;

// Parse the user's initial data
const initData = tg.initDataUnsafe;
const user = initData.user;

// Display user details
const userDetailsDiv = document.getElementById("user-details");
const profilePic = user.photo_url
  ? `<img src="${user.photo_url}" alt="Profile Picture">`
  : `<img src="https://via.placeholder.com/60" alt="Default Profile Picture">`;

userDetailsDiv.innerHTML = `
  ${profilePic}
  <div>
    <h3>Hello, ${user.first_name} ${user.last_name || ''}!</h3>
    <p>Username: @${user.username || 'N/A'}</p>
    <p>User ID: ${user.id}</p>
  </div>
`;

// Section navigation
const menuLinks = document.querySelectorAll('.bottom-menu a');
const sections = document.querySelectorAll('.content-section');

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    const target = link.getAttribute('href').substring(1);
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

// Activate the Home section by default
document.getElementById('home').classList.add('active');

// Feedback button logic
document.getElementById("send-feedback").addEventListener("click", async () => {
  const feedbackMessage = document.getElementById("feedback-text").value.trim();

  if (!feedbackMessage) {
    alert("Please write some feedback before sending.");
    return;
  }

  const ADMIN_CHAT_ID = "1258152672"; // Replace with your admin chat ID

  const response = await fetch(`https://api.telegram.org/bot8080972949:AAHeqF2352do546naypN2FS-p_BNagw2keU/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text: `Feedback from ${user.first_name} (${user.username || 'N/A'} - ${user.id}):\n\n${feedbackMessage}`,
    }),
  });

  if (response.ok) {
    alert("Thank you for your feedback!");
    document.getElementById("feedback-text").value = "";
  } else {
    alert("Error sending feedback.");
  }
});
