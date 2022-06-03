const TelegramBot = require("node-telegram-bot-api");
// const axois =require('axios')
const mongoose = require("mongoose");

const Controllers = require("./controllers.js");
const { TOKEN, MONGODB, OPTIONS } = require("./config.js");
const {log} = require("qrcode/lib/core/galois-field");

const connectionParams = {
  useNewUrlParser: true,

  useUnifiedTopology: true,
};
mongoose
  .connect(MONGODB, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
const bot = new TelegramBot(TOKEN, OPTIONS);

bot.setMyCommands([
  { command: "/start", description: "Start bot" },
  { command: "/info", description: "Bot info" },
]);

async function Main() {
  await bot.on("message", (message) =>
    Controllers.MessageController(message, bot)
    // console.log(message.data)
  );
   await bot.on("callback_query", (message) =>
      console.log(message)

   );
}
Main();
