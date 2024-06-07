import express, { json } from 'express';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const appServer = express();
appServer.use(cors());
appServer.use('/' , (req, res) => {
    res.status(200).json({ message: 'Email is already registered' });
});
async function startApolloServer() {
  appServer.listen( process.env.PORT, () => {
    console.log("congratulations we are connected");
  })
}
startApolloServer().catch(err => console.error('Error starting server: ', err));