const path = require('path');

module.exports = ({ env }) => {
  // Debug logging
  console.log('=== DATABASE CONFIG DEBUG ===');
  console.log('DATABASE_CLIENT:', env('DATABASE_CLIENT'));
  console.log('DATABASE_URL:', env('DATABASE_URL') ? 'SET' : 'NOT SET');
  console.log('NODE_ENV:', env('NODE_ENV'));
  console.log('============================');

  const client = env('DATABASE_CLIENT', 'sqlite');
  
  if (!client) {
    console.error('DATABASE_CLIENT is undefined!');
    throw new Error('DATABASE_CLIENT environment variable is required');
  }

  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        },
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10)
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  console.log('Selected client:', client);
  console.log('Available connections:', Object.keys(connections));

  return {
    connection: connections[client],
    settings: {
      forceMigration: false,
    },
  };
};