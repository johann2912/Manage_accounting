import * as dotenv from 'dotenv';
dotenv.config();

const config  = {
    project: { 
        port: process.env.PORT,
        swagger_pass: process.env.SWAGGER_PASS,
    },
    database: {
        host: process.env.DB_HOST,
        db: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
};

export default config;