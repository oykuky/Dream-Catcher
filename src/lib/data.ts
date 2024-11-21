import { Dream } from "./models";
import connectToDb from "./utils";

export const getDreams = async () => {
  try {
    console.log("Connecting to database...");
    await connectToDb();
    console.log("Connected to the database, dreams are fetched...");
    const dreams = await Dream.find();
    return dreams;
  } catch (err) {
    console.error("Error occurred while fetching dreams:", err);
    throw err;
  }
};

export const getDream = async (slug:string) => {
  try {
    console.log("Connecting to database...");
    await connectToDb();
    console.log("Connected to the database, dream are fetched...");
    const dream = await Dream.findOne({ slug });
    return dream;
  } catch (err) {
    console.error("Error occurred while fetching dream:", err);
    throw err;
  }
};


export const deleteDream = async(slug:string) => {
  try {
    console.log("Connecting to database...");
    await connectToDb();
    console.log("Connected to the database, dream is deleting...");
    await Dream.deleteOne({slug});
    console.log("Deleted from database")
  } catch (err) {
    console.log("Error occured while deleting dream!:",err);
    throw err;
  }

}