import pino from "pino";

const nodeEnv = process.env.NODE_ENV ?? "development";
const defaultLevel = nodeEnv === "test" ? "silent" : "info";

const logger = pino({
  level: process.env.LOG_LEVEL ?? defaultLevel,
  transport:
    nodeEnv === "development" ? { target: "pino-pretty", options: { colorize: true } } : undefined,
});

export default logger;
