import { Query, Resolver } from 'type-graphql';

@Resolver()
export class ServerStatusResolver {
    @Query(() => String, { name: 'status' })
    getServerStatus() {
        return 'Running!';
    }
}
