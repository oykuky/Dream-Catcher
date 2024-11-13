import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  dreams: IDream[];
}
export interface IDream extends Document {
  userId: string;
  content: string;
  keywords: string[];
  interpretation: string;
  createdAt: Date;
  mood?: string;
  emotionalAnalysis: string;
  practicalAdvice: string;
  symbols: string[];
}

const DreamSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  keywords: { type: [String], required: true },
  interpretation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  mood: { type: String },
  emotionalAnalysis: { type: String },
  practicalAdvice: { type: String },
  symbols: [
    {
      symbol: { type: String },
      meaning: { type: String },
    },
  ],
});

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  dreams: { type: [DreamSchema], default: [] },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
const Dream = mongoose.models.Dream || mongoose.model<IDream>("Dream", DreamSchema);

export { User, Dream };

