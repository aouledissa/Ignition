import express from 'express';
import 'reflect-metadata';
import { config } from './config/config';
import createGraphQLServer from './library/graphql/GraphqlServer';
import Logger from './library/logging/Logger';

const startServer = async () => {
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
    app.get('/status', (_, res) => res.status(200).json({ message: 'Up and running :D' }));

    const graphQLServer = await createGraphQLServer(app);
    graphQLServer.httpServer.listen(config.server.port, () => {
        const os = require('os');
        const graphQLEndpoint = `http://${os.hostname}:${config.server.port}/graphql`;
        Logger.info(`runtime at http://${os.hostname}:${config.server.port}`);
        Logger.info(`graphQL runtime at ${graphQLEndpoint}`);
    });

    /** Error handling */
    app.use((req, res, _) => {
        const error = Error(`${req.url} path was not found`);
        Logger.error(error.message);
        Logger.error(error);

        return res.status(404).json({ message: error.message });
    });
};

startServer();
