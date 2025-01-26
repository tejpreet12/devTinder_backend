// mongoose.connect("mongodb+srv://tejpreetsingh:Tb3GucEnEdYmSBHf@namastenode.6ismr.mongodb.net/")

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://tejpreetsingh:Tb3GucEnEdYmSBHf@namastenode.6ismr.mongodb.net/DevTinder"
  );
};

module.exports = {
    connectDB,
}