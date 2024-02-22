import fs from "fs";
import dotenv from "dotenv";

const loadEnvVars = (envFile) => {
  if (!envFile || !fs.existsSync(envFile))
    throw new Error(
      `Env file could not be found under this path: ${envFilePath}`
    );

  dotenv.config({
    path: envFile,
  });
}

export default loadEnvVars;