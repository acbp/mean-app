const config = {
  PORT:process.env.PORT || process.env.npm_package_config_port || 1337,
  DB_CONNECTION:process.env.DB_CONNECTION || process.env.npm_package_config_db ||'mongodb',
  DB:process.env.DB || process.env.npm_package_config_db ||'localhost',
  PUBLIC_FOLDER:process.env.DB || process.env.npm_package_config_db ||'public'
};

module.exports = config;
