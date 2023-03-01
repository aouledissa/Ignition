import dotenv from 'dotenv';
import { requireVariable } from '../library/env';

dotenv.config();
const os = require('os');

export const config = {
    server: {
        port: requireVariable(process.env.SERVER_PORT, Number, true),
        hostname: os.hostname()
    }
};
