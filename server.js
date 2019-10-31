import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import bodyParser from "body-parser";
import logger from './core/logger/app-logger';
import connectToDb from './db/connect';
import routes from './routes';
const app = express();
const env = process.env.NODE_ENV;
const PORT = 6060;

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

connectToDb();
//  Connect all our routes to our application

app.use(cors());
app.use(bodyParser.json({
    limit: "50mb",
    extended: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan("dev", {
    "stream": logger.stream
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Authorization', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "x-peymynt-app-secret-key, x-peymynt-business-id, Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((req, res, next) => {
    req.projectBaseUrl = __dirname;
    next();
})

app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(":) Hey Server is running on ", PORT);
});