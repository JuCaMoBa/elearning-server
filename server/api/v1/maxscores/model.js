const mongoose = require("mongoose");
const { body } = require("express-validator");

const sanitizers = [
  body("maths").escape(),
  body("history").escape(),
  body("science").escape(),
  body("geography").escape(),
];

const fields = {
  maths: {
    type: Number,
    trim: true,
  },
  history: {
    type: Number,
    trim: true,
  },
  science: {
    type: Number,
    trim: true,
  },
  geography: {
    type: Number,
    trim: true,
  },
};

const references = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
};

const maxscores = new mongoose.Schema(Object.assign(fields, references), {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

const model = mongoose.model("maxscores", maxscores);

module.exports = {
  Model: model,
  fields,
  references,
  sanitizers,
};
