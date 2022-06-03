const axios = require("axios");
const BotUserModel = require("./users/BotUserModel");
const CilientModel = require("./client/ClientModel");
const keyboards = require("./keyboards/Keyboards");
const InlineKeyboards = require("./keyboards/InlineKeyboards");
const Functions = require("./Functions");
const {log} = require("qrcode/lib/core/galois-field");
module.exports = class Controllers {
  static async MessageController(message, bot) {
    const chat_id = message.chat.id;
    const text = message.text;
    const contact = message.contact;
    const first_name = message.from.first_name;
    const user = await BotUserModel.findOne({ chatID: chat_id });
    if (text === "/start") {
      // const res = await axios.get("http://localhost:5000/service");

      if (!user) {
        await Functions.setUser(bot, message);
      } else if (user.step === 1) {
        await bot.sendMessage(
          chat_id,
          `Salom ${first_name} foydalanish uchun telefon raqamizni yuboring!`,
          {
            reply_markup: {
              resize_keyboard: true,
              one_time_keyboard: true,
              remove_keyboard: true,
              keyboard: keyboards.setKeyboard,
            },
          }
        );
      } else {
        await bot.sendMessage(chat_id, `Salom ${first_name}`, {
          reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            inline_keyboard: InlineKeyboards.setMainInlineKey,
          },
        });
      }
    } else if (user.step === 1) {
      // const client = await CilientModel.findOne({ tel: contact.phone_number });

      // console.log(client);
      // console.log(contact);
      if (1==1
        // client.tel == contact.phone_number ||
        // client.contact == +contact.phone_number
      ) {
        console.log(message)
        // await Functions.setPhone(contact, bot, chat_id, user, client);
      } else {
        // console.log(contact);
        await bot.sendMessage(chat_id, "Siz botdan foydalana olmaysiz !");
      }
    } else {
      await bot.sendMessage(chat_id, "belgilanmagan buyruq!");
    }
  }
  static async InlineController(message, bot) {
    // const chat_id = message.from.id;
    // const user = await BotUserModel.findOne({ chatID: chat_id });
    console.log(message)
    // // Serwice tekshiruvi boshlandi
    // if (message.data === "service" && user.step === 2) {
    //   await Functions.setService(bot, chat_id, message);
    //   // await bot.deleteMessage(chat_id, message.message.message_id);
    // } else if (message.data === "meet") {
    //   await Functions.setMeet(bot, chat_id, message);
    // }
    // // Serwice tekshiruvi tugadi
    // //
    // if (message.data === "ok") {
    //   await Functions.setVerifyService(bot, chat_id, message);
    // } else if (message.data === "no") {
    //   await Functions.setBackService(bot, chat_id, message);
    // }
    // // service hizmatini tasdiqlash
    // if (message.data === "tasdiq") {
    //   await Functions.setServiceTasdiq(bot, chat_id, message);
    // }
    // if (message.data === "oldService") {
    //   await Functions.setBackService(bot, chat_id, message);
    //   await Functions.setOldService(bot, chat_id, message);
    // }
  }
};
