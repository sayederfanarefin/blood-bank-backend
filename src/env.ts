import * as dotenv from 'dotenv';
import * as path from 'path';

import * as pkg from '../package.json';
import {
    getOsEnv, getOsEnvOptional, getOsPath, getOsPaths, normalizePort, toBool, toNumber
} from './lib/env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        description: (pkg as any).description,
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
        banner: toBool(getOsEnv('APP_BANNER')),
        publicFolder: getOsEnv('APP_PUBLIC_FOLDER'),
        dirs: {
            // migrations: getOsPaths('TYPEORM_MIGRATIONS'),
            // migrationsDir: getOsPath('TYPEORM_MIGRATIONS_DIR'),
            entities: getOsPaths('TYPEORM_ENTITIES'),
            entitiesDir: getOsPath('TYPEORM_ENTITIES_DIR'),
            controllers: getOsPaths('CONTROLLERS'),
            middlewares: getOsPaths('MIDDLEWARES'),
            interceptors: getOsPaths('INTERCEPTORS'),
            subscribers: getOsPaths('SUBSCRIBERS'),
            resolvers: getOsPaths('RESOLVERS'),
        },
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnvOptional('LOG_JSON')),
        output: getOsEnv('LOG_OUTPUT'),
    },
    db: {
        type: getOsEnv('TYPEORM_CONNECTION'),
        host: getOsEnvOptional('TYPEORM_HOST'),
        port: toNumber(getOsEnvOptional('TYPEORM_PORT')),
        username: getOsEnvOptional('TYPEORM_USERNAME'),
        password: getOsEnvOptional('TYPEORM_PASSWORD'),
        database: getOsEnv('TYPEORM_DATABASE'),
        synchronize: toBool(getOsEnvOptional('TYPEORM_SYNCHRONIZE')),
        logging: toBool(getOsEnv('TYPEORM_LOGGING')),
        ssl: getOsEnv('TYPEORM_SSL'),
    },
    graphql: {
        enabled: toBool(getOsEnv('GRAPHQL_ENABLED')),
        route: getOsEnv('GRAPHQL_ROUTE'),
        editor: toBool(getOsEnv('GRAPHQL_EDITOR')),
    },
    swagger: {
        enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
        route: getOsEnv('SWAGGER_ROUTE'),
        file: getOsEnv('SWAGGER_FILE'),
        username: getOsEnv('SWAGGER_USERNAME'),
        password: getOsEnv('SWAGGER_PASSWORD'),
    },
    monitor: {
        enabled: toBool(getOsEnv('MONITOR_ENABLED')),
        route: getOsEnv('MONITOR_ROUTE'),
        username: getOsEnv('MONITOR_USERNAME'),
        password: getOsEnv('MONITOR_PASSWORD'),
    },
    schedulerModule: {
        baseUrl: getOsEnv('SCHEDULER_MOD_API_BASE_URL'),
        createUserEndpoint: getOsEnv('SCHEDULER_MOD_API_ENDPOINT'),
        accessToken: getOsEnv('MAINBACKEND_ACCESS_TOKEN'),
        socketEndpoint: getOsEnv('SCHEDULER_MOD_SOCKET_ENDPOINT'),
        socketBase: getOsEnv('SCHEDULER_MOD_SOCKET_BASE'),
        socketKey: getOsEnv('SERVER_KEY'),
        socketPrivateKey: getOsEnv('SERVER_KEY_PRIVATE_KEY'),
        socketPublicKey: getOsEnv('SERVER_KEY_PUBLIC_KEY'),
    },
    firebase: {
        serviceAccount: {
            type: getOsEnv('TYPE'),
            project_id: getOsEnv('PROJECT_ID'),
            private_key_id: getOsEnv('PRIVATE_KEY_ID'),
            private_key: getOsEnv('PRIVATE_KEY').replace(/\\n/g, '\n') ,
            client_email: getOsEnv('CLIENT_EMAIL'),
            client_id: getOsEnv('CLIENT_ID'),
            auth_uri: getOsEnv('AUTH_URI'),
            token_uri: getOsEnv('TOKEN_URI'),
            auth_provider_x509_cert_url: getOsEnv('AUTH_PROVIDER_X509_CERT_URL'),
            client_x509_cert_url: getOsEnv('CLIENT_X509_CERT_URL'),
            database_url: getOsEnv('DATABASE_URL'),
        },
        clientConfig: {
            apiKey: getOsEnv('APIKEY'),
            authDomain: getOsEnv('AUTHDOMAIN'),
            databaseURL: getOsEnv('DATABASEURL'),
            projectId: getOsEnv('PROJECTID'),
            storageBucket: getOsEnv('STORAGEBUCKET'),
            messagingSenderId: getOsEnv('MESSAGINGSENDERID'),
        },
    },
    azureMachineLearningStudio: {
        apiKey: getOsEnv('ML_STUDIO_API_KEY'),
        url: getOsEnv('ML_STUDIO_URL'),
    },
};
