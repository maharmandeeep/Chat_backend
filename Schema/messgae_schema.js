import mongoose from "mongoose";

const message_schema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },

    users: Array,

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  {
    timestamps: true,
  }
);


    const Messages=mongoose.model("Messages",message_schema);
    export default Messages;
