/**
 * Extracts cast an env variable
 * @param name environment variable name (exp: process.env.MY_VARIABLE)
 * @param type the desired return type
 */
export function requireVariable(name: string | undefined, type: any, strict: boolean = false) {
    const variable = name as typeof type;
    if (!variable && strict) throw new Error(`${name} is not defined`);
    return variable;
}
