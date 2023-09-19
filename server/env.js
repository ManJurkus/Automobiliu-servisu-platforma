import dotenv from 'dotenv';

dotenv.config();

const e = process.env;

export const PROJECT_TITLE = e.PROJECT_TITLE ?? 'Project title';
export const CLIENT_PORT = e.CLIENT_PORT ?? 7000;
export const SERVER_PORT = e.SERVER_PORT ?? 6969;
export const NODE_ENV = e.NODE_ENV ?? 'dev';
export const DB_HOST = e.DB_HOST ?? 'localhost';
export const DB_USER = e.DB_USER ?? 'root';
export const DB_PASS = e.DB_PASS ?? '';
export const DB_DATABASE = e.DB_DATABASE ?? '';

export const env = {
    PROJECT_TITLE,
    CLIENT_PORT,
    SERVER_PORT,
    NODE_ENV,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_DATABASE,
};

export default env;