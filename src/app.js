const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middleware/error.middleware');

const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');

class App {
    constructor(port) {
        this.app = express();
        this.port = port;
    }

    start = async () => {
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.app.use(errorMiddleware);

        this.listen();
    }

    initializeRoutes = () => {
        this.app.use('/', authRouter);
        this.app.use('/', userRouter);
    }

    initializeMiddlewares = () => {
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
        this.app.use(cors());
    }

    listen = () => {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

module.exports = {
    App: App,
};