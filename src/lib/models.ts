import mongoose, { Schema, Document } from "mongoose";


interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  dreams: IDream[]; 
}

interface IDream extends Document {
  userId: string;
  content: string;
  keywords: string[];
  interpretation: string;
  createdAt: Date;
  mood?: string;
}

const DreamSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  keywords: { type: [String], required: true },
  interpretation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  mood: { type: String }
});


const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  dreams: { type: [DreamSchema], default: [] }
});


const User = mongoose.model<IUser>("User", UserSchema);
const Dream = mongoose.model<IDream>("Dream", DreamSchema);

export { User, Dream };
export type { IUser, IDream };
//interface'ler export edilirken export type kullanılmalı(isolatedModules)