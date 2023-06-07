import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const logSchema = new Schema({
  happiness: {
    type: Number,
  },
  anxiety: {
    type: Number,
  },
  sadness: {
    type: Number,
  },
  anger: {
    type: Number,
  },
  notes: {
    type: String,
  },
});
