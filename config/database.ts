const path = require('path');

module.exports = ({ env }) => {
  if (env('NODE_ENV') === 'production') {
    // Production configuration (PostgreSQL)
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: env.bool('DATABASE_SSL', false),
        },
        acquireConnectionTimeout: 60000,
        pool: {
          min: 2,
          max: 10,
        },
      },
    };
  } else {
    // Development configuration (SQLite)
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', '..', '.tmp/data.db'),
        },
        useNullAsDefault: true,
      },
    };
  }
};