import json
from telegram import Update, Bot
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
from telegram.ext import CallbackContext

# Your bot token from BotFather
BOT_TOKEN = "8080972949:AAF3ZUQpfyJn6XU7a2n-nfk85a1nyL61zpg"
bot = Bot(token=BOT_TOKEN)


# Command to start the bot and show a menu with the Web App button
def start(update: Update, context: CallbackContext):
    # Send a welcome message and show the Web App button
    keyboard = [[{
        "text": "Open Web App",
        "web_app": {"url": "https://sahanlaksitha.github.io/app/"}
    }]]
    reply_markup = {"keyboard": keyboard, "resize_keyboard": True}

    update.message.reply_text(
        "Welcome! Click the button below to open the Web App.",
        reply_markup=json.dumps(reply_markup)
    )


# Handle Web App data sent from the client (e.g., requesting profile picture)
def handle_webapp_data(update: Update, context: CallbackContext):
    # Decode the received Web App data
    web_app_data = json.loads(update.message.web_app_data.data)

    if web_app_data.get("action") == "get_profile_picture":
        user_id = web_app_data.get("user_id")

        # Fetch user profile photos
        photos = bot.get_user_profile_photos(user_id)
        if photos and photos.total_count > 0:
            # Get the first photo's file ID
            file_id = photos.photos[0][0].file_id
            file = bot.get_file(file_id)

            # Send the profile picture URL back to the Web App
            profile_picture_url = f"https://api.telegram.org/file/bot{BOT_TOKEN}/{file.file_path}"

            # Send the profile picture URL as a response to the Web App
            update.message.reply_text(
                json.dumps({"profile_picture_url": profile_picture_url})
            )
        else:
            # No profile photo available
            update.message.reply_text(
                json.dumps({"profile_picture_url": None})
            )


# Handle feedback data from the Web App
def handle_feedback(update: Update, context: CallbackContext):
    # Decode the received Web App data
    web_app_data = json.loads(update.message.web_app_data.data)

    if web_app_data.get("action") == "send_feedback":
        feedback = web_app_data.get("feedback")
        # You can log the feedback, save it to a database, or notify the admin
        print(f"Feedback received: {feedback}")

        # Reply to the user with a confirmation
        update.message.reply_text("Thank you for your feedback!")


# Main function to set up the bot
def main():
    updater = Updater(token=BOT_TOKEN, use_context=True)
    dispatcher = updater.dispatcher

    # Command handler for /start
    dispatcher.add_handler(CommandHandler("start", start))

    # Handler for Web App data
    dispatcher.add_handler(MessageHandler(Filters.web_app_data, handle_webapp_data))

    # Start polling
    updater.start_polling()
    updater.idle()


if __name__ == "__main__":
    main()
