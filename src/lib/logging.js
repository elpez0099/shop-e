import winston from "winston";
import settings from '../config/settings.json' with { type: "json" };
const { errorLog, infoLog } = settings;
const getLogger = () => {
   if (!errorLog || !infoLog) {
    console.log("App logger could not be initialized, no defined paths!");
    return {
        log: console.log,
        error: console.error
    };
  }
  return new winston.Logger({
    timestamp: function () {
      return Date.now();
    },
    formatter: function (options) {
      return (
        options.timestamp() +
        " " +
        config.colorize(options.level, options.level.toUpperCase()) +
        " " +
        (options.message ? options.message : "") +
        (options.meta && Object.keys(options.meta).length
          ? "\n\t" + JSON.stringify(options.meta)
          : "")
      );
    },
    transports: [
      new winston.transports.File({
        name: "info-file",
        filename: infoLog,
        level: "info",
      }),
      new winston.transports.File({
        name: "error-file",
        filename: errorLog,
        level: "error",
      }),
    ],
  });
};
export default getLogger;
