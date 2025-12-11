//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  experimental: {
    externalDir: true,
  },
  serverExternalPackages: ['knex', 'mysql2'], // Moved here from experimental
  transpilePackages: ['@sematicca/react', '@sematicca/core', '@sematicca/knex'],
  webpack: (config, { isServer }) => {
    // Only apply these externals on the server side
    if (isServer) {
      config.externals.push({
        'oracledb': 'commonjs oracledb',
        'pg-query-stream': 'commonjs pg-query-stream',
        'pg-native': 'commonjs pg-native',
        'sqlite3': 'commonjs sqlite3',
        'better-sqlite3': 'commonjs better-sqlite3',
        'tedious': 'commonjs tedious',
        'mysql': 'commonjs mysql',
      });
    }

    // For client side, ignore all database-related modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        'oracledb': false,
        'pg-query-stream': false,
        'pg-native': false,
        'sqlite3': false,
        'better-sqlite3': false,
        'tedious': false,
        'mysql': false,
        'mysql2': false,
        'knex': false,
      };
    }

    // Add absolute path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sematicca/react': path.join(__dirname, '../../libs/react/src'),
      '@sematicca/core': path.join(__dirname, '../../libs/core/src'),
      '@sematicca/knex': path.join(__dirname, '../../libs/knex/src'),
    };

    // Ensure these extensions are resolved
    config.resolve.extensions = [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.json',
      ...config.resolve.extensions,
    ];

    return config;
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);