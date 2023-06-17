import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chartSchema = new Schema({
  name: {
    type: Date,
  },
  happiness: {
    type: Number,
    min: 0,
    max: 5,
  },
  sadness: {
    type: Number,
    min: 0,
    max: 5,
  },
  anxiety: {
    type: Number,
    min: 0,
    max: 5,
  },
  anger: {
    type: Number,
    min: 0,
    max: 5,
  },
});

const Chart = mongoose.model("Chart", chartSchema);

export { Chart };
