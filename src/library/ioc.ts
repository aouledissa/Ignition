import { DependencyContainer } from 'tsyringe';

export default function autoResolverWithContainer(container: DependencyContainer) {
    return { get: (cls: any) => container.resolve(cls) };
}
