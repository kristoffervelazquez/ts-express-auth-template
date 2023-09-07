import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateId from "../utils/generateId.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    token: {
      type: String,
      default: generateId(),
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    methods: {
      validatePassword: async function (passwordFormulario: string) {
        return await bcrypt.compare(passwordFormulario, this.password);
      }
    },
    timestamps: true,
  },
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const saltRounds = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = mongoose.model("User", userSchema);
export default User;
