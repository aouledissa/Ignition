import { ApolloServer } from '@apollo/server';
import http from 'http';
import { Express } from 'express';
import autoCollectResolvers from './schema.utils';
import { buildSchema } from 'type-graphql';
import { resolve } from 'path';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { diContainer } from '../../di/di.config';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import Logger from '../logging/Logger';

export interface GqlServerConfig {
    httpServer: http.Server;
    graphqlServer: ApolloServer;
}

export default async function createGraphQLServer(app: Express) {
    const httpServer = http.createServer(app);
    const resolvers = autoCollectResolvers(`./${process.env.ROOT_DIR}/graphql`, 'resolver', ['ts', 'js']);

    Logger.info(`path to Schema: ${resolve(`${process.cwd()}/schema.gql`)}`);

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [resolvers],
            emitSchemaFile: {
                path: resolve(`${process.cwd()}/schema.gql`),
                sortedSchema: false
            },
            container: diContainer
        }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await apolloServer.start();

    app.use('/graphql', bodyParser.json(), expressMiddleware(apolloServer));

    return {
        httpServer: httpServer,
        graphQLServer: apolloServer
    };
}
