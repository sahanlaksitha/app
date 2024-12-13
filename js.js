const fetch = require('node-fetch');

// Replace with your bot token
const BOT_TOKEN = '8080972949:AAHeqF2352do546naypN2FS-p_BNagw2keU';

// Function to set up a custom keyboard with a web app button
async function setWebAppButton() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`;

  const body = {
    commands: [
      {
        command: 'start',
        description: 'Start the bot'
      }
    ],
    menu_button: {
      type: 'web_app',
      text: 'Open Web App',
      web_app: { url: 'https://sahanlaksitha.github.io/app/js.js' }
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const result = await response.json();
  console.log(result);
}

setWebAppButton();
