import getLogger from "../lib/logging.js";

const logger = getLogger();
const errorMiddleware = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  };

  logger.error(err.message);

  res.status(error.statusCode).json({
    message: error.message,
  });
};

export default errorMiddleware;
