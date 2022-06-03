const BotUserModel = require("./users/BotUserModel");
const ReportModel = require("./report/ReportModel");
const keyboards = require("./keyboards/Keyboards");
const InlineKeyboards = require("./keyboards/InlineKeyboards");
const CilientModel = require("./client/ClientModel");
const QRCode = require("qrcode");
const qr = require("qr-image");

module.exports = class Functions {
  // User saqlash
  static async setUser(bot, message) {
    const chat_id = message.chat.id;
    // const text = message.text;
    // const contact = message.contact;
    const first_name = message.from.first_name;
    try {
      const category = await new BotUserModel({
        chatID: chat_id,
        date: new Date(),
        step: 1,
      });
      category.save(category);
      await bot.sendMessage(
        chat_id,
        `${first_name} Telefon raqamingizni yuboring!`,
        {
          reply_markup: {
            remove_keyboard: true,
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: keyboards.setKeyboard,
          },
        }
      );
    } catch (err) {
      await bot.sendMessage(chat_id, "Hatolik");
    }
  }
  // Contact saqlash
  static async setPhone(contact, bot, chat_id, user, client) {
    console.log(me);
    try {
      const category = {
        step: 2,
        phone: contact.phone_number,
      };
      const elem = {
        chatID: chat_id,
      };
      await BotUserModel.findByIdAndUpdate(user._id, category);
      await CilientModel.findByIdAndUpdate(client._id, elem);

      await bot.sendMessage(chat_id, `Contact yaratildi! `, {
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          inline_keyboard: InlineKeyboards.setMainInlineKey,
        },
      });
    } catch (err) {
      await bot.sendMessage(chat_id, "Hatolik");
    }
  }

  // Service chaqirish
  static async setService(bot, chat_id, message) {
    try {
      await bot.editMessageText(
        "Tamirlash hizmatiga murojaat qilmoqchimisiz ?",
        {
          chat_id: chat_id,
          message_id: message.message.message_id,
          reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            inline_keyboard: InlineKeyboards.setInlineKey,
          },
        }
      );
    } catch (err) {
      await bot.sendMessage(chat_id, "Meet Hatolik");
    }
  }
  // meet
  static async setMeet(bot, chat_id, message) {
    try {
      await bot.editMessageText("Quydagi linkni bosing ", {
        chat_id: chat_id,
        message_id: message.message.message_id,
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          inline_keyboard: InlineKeyboards.setInlineMeet,
        },
      });
    } catch (err) {
      await bot.sendMessage(chat_id, "Service Hatolik");
    }
  }
  // New functions setBackService
  static async setBackService(bot, chat_id, message) {
    try {
      await bot.editMessageText("Siz asosiy Menyudasiz", {
        chat_id: chat_id,
        message_id: message.message.message_id,
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          inline_keyboard: InlineKeyboards.setMainInlineKey,
        },
      });
    } catch (err) {
      await bot.sendMessage(chat_id, "Service Hatolik");
    }
  }
  // yangi buyritma yaratish setVerifyService
  static async setVerifyService(bot, chat_id, message) {
    console.log(chat_id);
    try {
      const user = await CilientModel.findOne({ chatID: chat_id });
      console.log(user);
      if (user) {
        const report = await ReportModel.findOne({
          chatID: chat_id,
          tasdiq: false,
        });
        // console.log(client);
        if (report) {
          await bot.editMessageText("Sizda tugallanmagan hizmatlar mavjud", {
            chat_id: chat_id,
            message_id: message.message.message_id,
            reply_markup: {
              resize_keyboard: true,
              one_time_keyboard: true,
              inline_keyboard: InlineKeyboards.setOldService,
            },
          });
        } else {
          // Report counter start
          const countMonth = await ReportModel.find({
            date: new Date().getMonth(),
          });
          // console.log(countMonth.length + "year");
          const countYear = await ReportModel.find({
            date: new Date().getFullYear(),
          });
          // console.log(countYear.length + "year");

          // Report counter start
          // console.log(Clients);
          const category = await new ReportModel({
            userName: "",
            userFish: "",
            userlar: "",
            tasdiq: false,
            services: [],
            chatID: chat_id,
            cilientFish: user.fish,
            cilientBolim: user.bolim,
            cilientKabinet: user.lavozimi,
            fullFData: new Date(),
            countYear: countYear.length + 1,
            countMonth: countMonth.length + 1,
          });
          category.save(category);
          var opts = {
            type: "image/png",
            quality: 0.3,
            margin: 1,
            width: 200,
            // color: {
            //   dark: "#010599FF",
            //   light: "#FFBF60FF",
            // },
          };
          const qrCode = await QRCode.toFile(
            `./uploads/${category._id.toString()}.png`,
            category._id.toString(),
            opts
          );

          await bot.sendPhoto(chat_id, `./uploads/${category._id}.png`, {
            caption: `Scaner qiling`,
            reply_markup: {
              resize_keyboard: true,
              one_time_keyboard: true,
              inline_keyboard: InlineKeyboards.setInlineServiceTrue,
            },
          });
          await bot.sendMessage(
            -1001566573626,

            `<b>Farg'ona viloyat hokimligi</b>
            <b>Tartib raqami: #${countYear.length + 1}</b>
            <b>Ismi: ${user.fish}</b>
            <b>Bo'lim: ${user.bolim}</b>
            <b>Lavozim: ${user.lavozim}</b>
            <b>Vaqti: ${new Date().toDateString()}</b>
            <b>Holati: #aktiv</b>`,
            { parse_mode: "HTML" }
          );
        }
      }
    } catch (err) {
      await bot.sendMessage(chat_id, "Verify Hatolik");
    }
  }
  // New functions setServiceTasdiq Tasdiqlangan service delete
  static async setServiceTasdiq(bot, chat_id, message) {
    try {
      const user = await CilientModel.findOne({ chatID: chat_id });
      if (user) {
        const report = await ReportModel.findOne({
          chatID: chat_id,
          tasdiq: false,
        });
        // console.log(report.services.length);
        if (report.services.length <= 0) {
          await bot.answerCallbackQuery(message.id, {
            text: "Ushu hizmatni hozir tasdiqlay olmaysiz 🚫",
            show_alert: true,
          });
        } else {
          await bot.answerCallbackQuery(message.id, {
            text: "Dalolotnoma tuzildi 🤝🏻",
            show_alert: true,
          });
          await bot.deleteMessage(chat_id, message.message.message_id);
          await ReportModel.findByIdAndUpdate(report._id, { tasdiq: true });
        }
      }

      // console.log(message);
    } catch (err) {
      await bot.sendMessage(chat_id, "Service Hatolik");
    }
  }
  // New functions setServiceTasdiq Tasdiqlangan service delete
  static async setOldService(bot, chat_id, message) {
    try {
      const user = await BotUserModel.findOne({ chatID: chat_id });
      if (user) {
        const client = await CilientModel.findOne({ phone: user.phone });
        const report = await ReportModel.findOne({
          chatID: chat_id,
          tasdiq: false,
        });
        await bot.sendPhoto(chat_id, `./uploads/${report._id}.png`, {
          caption: `Scaner qiling`,
          reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            inline_keyboard: InlineKeyboards.setInlineServiceTrue,
          },
        });
      }

      // console.log(message);
    } catch (err) {
      await bot.sendMessage(chat_id, "Service Hatolik");
    }
  }
};
