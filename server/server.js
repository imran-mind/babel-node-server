import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import bodyParser from "body-parser";
import logger from './core/logger/app-logger';
import connectToDb from './db/connect';
import routes    from './routes';
const app = express();
const env = process.env.NODE_ENV;
const PORT = 6060;

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

connectToDb();
//  Connect all our routes to our application
app.use('/', routes);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));


app.listen(PORT, () => {
    console.log(":) Hey Server is running on ", PORT);
});