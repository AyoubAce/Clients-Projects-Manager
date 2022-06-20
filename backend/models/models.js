const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
  phone: { type: String },
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not started", "In progress", "Completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

const Client = mongoose.model("Client", clientSchema);
const Project = mongoose.model("Project", projectSchema);


module.exports = { Client, Project };
