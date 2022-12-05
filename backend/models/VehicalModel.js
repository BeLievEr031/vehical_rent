import mongoose from "mongoose";

const vehicalSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
  },
  model: {
    type: String,
  },
  unit: {
    type: Number,
    default: 1,
  },
  amount: {
    type: Number,
  },
  isFree: {
    type: Boolean,
    default: true,
  },
  vehicalType: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
 
});

const VehicalModel = new mongoose.model("VehicalModel", vehicalSchema);

export default VehicalModel;
