const { Schema, model } = require("mongoose");

const contactModel = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    phone: {
      type: Number,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = model("Contact", contactModel);
module.exports = Contact;
