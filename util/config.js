const config = {
  PORT:process.env.PORT || process.env.npm_package_config_port || 1337,
  DB_CONNECTION:process.env.DB_CONNECTION || process.env.npm_package_config_db ||'mongodb/',
  DB:process.env.DB || process.env.npm_package_config_db ||'visitante:etnatisiv@ds161913.mlab.com:61913/arquimedes',
  PUBLIC_FOLDER:process.env.DB || process.env.npm_package_config_db ||'public',

  USER:"visitante",
  PASSWORD:"etnatisiv"
};

module.exports = config;
