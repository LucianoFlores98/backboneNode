require("dotenv").config();

const configs = {
  api: {
    port: process.env.PORT,
    uri: process.env.URI,
    default_page_count: process.env.DEFAULT_PAGE_COUNT,
  },
  secret_key: process.env.SECRETPRIVATEKEY,
  db: {
    database: process.env.DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    url: process.env.DB_URI,
    port: process.env.DB_PORT,
  },
  leadsFilesPath: process.env.LEADS_FILE_PATH,
  cendeuFilesPath: process.env.CENDEU_FILE_PATH,
};

export default configs;
