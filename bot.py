import json
from telegram import Update, KeyboardButton, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, ContextTypes, filters

# Replace with your bot token from BotFather
BOT_TOKEN = "8080972949:AAF3ZUQpfyJn6XU7a2n-nfk85a1nyL61zpg"

# Start command handler
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Handles the /start command and shows a button to open the Web App.
    """
    # Web App button
    web_app_button = KeyboardButton(
        text="Open Web App",
        web_app={"url": "https://sahanlaksitha.github.io/app"}
    )

    # Create a reply markup with the Web App button
    reply_markup = ReplyKeyboardMarkup(
        [[web_app_button]],
        resize_keyboard=True
    )

    # Send a welcome message with the Web App button
    await update.message.reply_text(
        "Welcome! Click the button below to open the Web App.",
        reply_markup=reply_markup
    )

# Web App data handler (handles feedback or other data)
async def handle_webapp_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Handles data received from the Web App and processes it.
    """
    if update.message.web_app_data:  # Ensure data is received
        web_app_data = json.loads(update.message.web_app_data.data)  # Parse JSON data

        # Example: Handle feedback action
        if web_app_data.get("action") == "send_feedback":
            feedback = web_app_data.get("feedback")
            print(f"Feedback received: {feedback}")
            await update.message.reply_text("Thank you for your feedback!")

        # Example: Handle other actions like fetching user data
        elif web_app_data.get("action") == "get_profile_picture":
            user_id = web_app_data.get("user_id")
            photos = await context.bot.get_user_profile_photos(user_id)

            if photos and photos.total_count > 0:
                file_id = photos.photos[0][0].file_id
                file = await context.bot.get_file(file_id)
                profile_picture_url = f"https://api.telegram.org/file/bot{BOT_TOKEN}/{file.file_path}"

                # Send profile picture URL back
                await update.message.reply_text(
                    f"Profile picture URL: {profile_picture_url}"
                )
            else:
                await update.message.reply_text("No profile picture found!")

# Main function to set up the bot
async def main():
    """
    Main entry point of the bot. Initializes the bot and handlers.
    """
    # Create an application instance with the bot token
    application = Application.builder().token(BOT_TOKEN).build()

    # Register handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_webapp_data))

    # Start the bot
    await application.run_polling()

# Run the bot
if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
