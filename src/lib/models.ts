import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
}

export interface IDream extends Document {
  slug: string;
  userId: mongoose.Types.ObjectId;
  content: string;
  keywords: string[];
  interpretation: string;
  createdAt: Date;
  mood?: string;
  emotionalAnalysis: string;
  practicalAdvice: string;
  symbols: {
    symbol: string;
    meaning: string;
  }[];
}

const SymbolSchema = new Schema({
  symbol: { type: String },
  meaning: { type: String }
}, { _id: false });

const DreamSchema: Schema = new Schema({
  slug: { type: String, required: true },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    index: true 
  },
  content: { type: String, required: true },
  keywords: { type: [String], required: true },
  interpretation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  mood: { type: String },
  emotionalAnalysis: { type: String },
  practicalAdvice: { type: String },
  symbols: [SymbolSchema]
});

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


DreamSchema.index({ userId: 1, slug: 1 }, { unique: true });

const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);
const Dream = mongoose.models?.Dream || mongoose.model<IDream>("Dream", DreamSchema);

export { User, Dream };