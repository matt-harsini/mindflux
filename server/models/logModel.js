import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const logSchema = new Schema({
  happiness: {
    type: String,
    default: null,
  },
  anxiety: {
    type: String,
    default: null,
  },
  sadness: {
    type: String,
    default: null,
  },
  anger: {
    type: String,
    default: null,
  },
  notes: {
    type: String,
  },
  user_id: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
});
