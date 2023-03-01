import express from 'express';
import http from 'http';
import { config } from './config/config';
import Logger from './library/Logger';

const startServer = () => {
    const app = express();

    app.use((req, res, next) => {
        /** Log the request */
        Logger.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log the response */
            Logger.info(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /** Health check */
    app.get('/status', (req, res, next) => res.status(200).json({ message: 'Up and running :D' }));

    /** Error handling */
    app.use((req, res, next) => {
        const error = Error('not found');
        Logger.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(app).listen(config.server.port, () => {
        Logger.info(`Server is running on port ${config.server.port}`);
    });

    // const graphQLServer = await requireGraphQLServer(app);
    // graphQLServer.httpServer.listen(port, () => {
    //     const graphQLEndpoint = `http://${hostname}:${port}/graphql`;
    //     console.log(`runtime at http://${hostname}:${port}`);
    //     console.log(`graphQL runtime at ${graphQLEndpoint}`);
    // });
};

startServer();
