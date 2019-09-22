import { ConnectionOptions } from 'typeorm';

import { env } from './env';

const config: ConnectionOptions = {
    type: 'postgres', // env.db.type as DatabaseType,
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    entities: env.app.dirs.entities,
    extra: {
        ssl: true, // env.db.ssl,
    },
};

export = config;
