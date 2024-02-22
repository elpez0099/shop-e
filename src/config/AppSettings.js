import settings from '../config/settings/settings.json' with { type: "json" };
import loadEnvVars from "../lib/loadEnvVars.js";

const {envFile} = settings;
loadEnvVars(envFile);
const EnvVars = {};

const AppSettings = () => {
    Object.keys(process.env).forEach((key, index) => {
        if(key.startsWith('SHOPE') ){
            key = key.toLowerCase();
            EnvVars[key] = process.env[key];
        }
    });
    return EnvVars;
}

export default AppSettings;