import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const logSchema = new Schema({
  moodMeter: {
    type: Map,
    of: Schema.Types.Mixed,
  },
  log: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Log = mongoose.model("Log", logSchema);

export { Log };
