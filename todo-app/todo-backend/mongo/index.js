const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const { MONGO_URL } = require("../util/config");

if (MONGO_URL && !mongoose.connection.readyState) {
  console.log("Connecting to:", MONGO_URL);
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  Todo,
};
