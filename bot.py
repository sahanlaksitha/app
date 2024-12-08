from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Welcome! Click the Web App button to get started.")

async def handle_webapp_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    data = update.message.web_app_data.data  # JSON data sent from the web app
    feedback = eval(data).get('message')  # Extract feedback
    await update.message.reply_text(f"Thank you for your feedback: {feedback}")

if __name__ == '__main__':
    app = ApplicationBuilder().token("8080972949:AAF3ZUQpfyJn6XU7a2n-nfk85a1nyL61zpg").build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.WEB_APP_DATA, handle_webapp_data))
    app.run_polling()
