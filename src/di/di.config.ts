import { SupportedType } from 'type-graphql/dist/utils/container';
import { ServerStatusResolver } from '../graphql/placeholder/serverstatus.resolver';
import { DIContainer } from './di.container';

const serverStatusResolver = new ServerStatusResolver();

export const diContainer: DIContainer = {
    get<T>(type: SupportedType<T>) {
        if (type === ServerStatusResolver) return serverStatusResolver;
        throw new Error('Check your DI ===> Resolver is undefined');
    }
};
