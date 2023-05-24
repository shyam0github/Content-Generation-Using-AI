const { Schema, model, Types } = require("../connection");

const userSchema = new Schema({
  prompt: { type: String, required: true },
  content: { type: String},
  user: { type: Types.ObjectId, ref: 'users' },
  created_at: Date,
});

module.exports = model("content", userSchema);
