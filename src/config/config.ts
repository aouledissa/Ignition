import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || '';

export const config = {
    server: {
        port: SERVER_PORT,
        hostname: SERVER_HOSTNAME
    }
};
