import express, {Express , Request , Response} from "express";
import dotenv from 'dotenv';
import httplogger from 'pino-http';
import logger from "./logger";
import authRoutes from './routes/authRoutes'
import mainRoutes from './routes/mainRoutes'

dotenv.config();

const app : Express = express();
const port = process.env.PORT || 3000;

app.use(httplogger({logger}));
// middileware that parses a json request
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("ok");
});

app.use('/api/auth' , authRoutes)
app.use('/api/home', mainRoutes)
// todo: add a check to see if the token had not expired then the user stays logged in even if the app was closed and restarted.

console.log('Starting server...');
const server = app.listen(port, () => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
  });
  
  process.on('uncaughtException', (err) => {
    // log the exception
    logger.fatal(err, 'uncaught exception detected');
    // shutdown the server gracefully
    server.close(() => {
      process.exit(1); // then exit
    });
  
    // If a graceful shutdown is not achieved after 1 second,
    // shut down the process completely
    setTimeout(() => {
      process.abort(); // exit immediately and generate a core dump file
    }, 1000).unref()
    process.exit(1);
  });