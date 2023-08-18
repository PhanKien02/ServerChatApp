import mongoose from "mongoose";
require('dotenv').config();
const URL = process.env.URL_DATABASE;
export async function connectDatabase() {
   try {
      await mongoose.connect(URL);
      console.log("Connect mongoose succesfully!");
   } catch (error) {
      console.log("Connect mongoose faild: ", error);
   }
}
