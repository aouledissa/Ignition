import { resolve } from 'path';

export default function autoCollectResolvers(srcDir: string, pattern: string, ext: string[]) {
    const sourcePath = resolve(srcDir);
    return sourcePath.concat('/**/*.', pattern, `.@(${ext.join('|')})`);
}
