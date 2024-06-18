import express, { json } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import { graphqlHTTP } from 'express-graphql';
import schema from './appGraphql/schema/index.js';

dotenv.config();

const appServer = express();
appServer.use(cors());
// appServer.use('/' , (req, res) => {
//     res.status(200).json({ message: 'we are connected 3' });
// });
appServer.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  headerEditorEnabled: true, // Enable the headers editor
  shouldPersistHeaders: true, // Remember headers between sessions
  defaultVariableEditorOpen: true, // Open variable editor by default
}));
async function startApolloServer() {
  appServer.listen( process.env.PORT, () => {
    console.log("congratulations we are connected");
  })
}
startApolloServer().catch(err => console.error('Error starting server: ', err));