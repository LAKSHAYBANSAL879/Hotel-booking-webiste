const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || mongodb+srv://authdb:99999@cluster0.plibeu4.mongodb.net/bookit);
    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`Mongodb Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
