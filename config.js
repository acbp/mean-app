const config = {
  PORT:process.env.PORT || process.env.npm_package_config_port || 1337,
  DB:process.env.DB || process.env.npm_package_config_db ||'localhost',
  PUBLIC_FOLDER:process.env.DB || process.env.npm_package_config_db ||'public'
};

module.exports = config;
