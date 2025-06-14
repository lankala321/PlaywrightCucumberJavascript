import * as dotenv from 'dotenv'
import * as path from "path";

export const getEnv = () => {
    const env = process.env.ENV;
    
    // Check if the environment variable is set
    if (env) {
         const envPath = path.resolve(__dirname, `../../profiles/.env.${env}`);
        dotenv.config({
            override: true,
            path: envPath
        });
    } else {
        console.error("NO ENV PASSED!")
    }
};