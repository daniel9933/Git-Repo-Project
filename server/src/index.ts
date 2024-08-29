import express, {Express , Request , Response} from "express";
import dotenv from 'dotenv';
import httplogger from 'pino-http';
import logger from "./logger";

dotenv.config();

const app : Express = express();
const port = process.env.PORT || 3000;

app.use(httplogger({logger}));
app.get("/", (req: Request, res: Response) => {
  res.send("ok");
});

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