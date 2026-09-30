import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ quiet: true });

const commaSeparatedUrls = z
  .string()
  .min(1)
  .transform((value) => value.split(",").map((url) => url.trim()))
  .pipe(z.array(z.url()).min(1));

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  MONGO_URI: z
    .string()
    .regex(/^mongodb(\+srv)?:\/\//, "must be a mongodb:// or mongodb+srv:// URI"),
  JWT_SECRET: z.string().min(32, "must be at least 32 characters"),
  CLIENT_URL: commaSeparatedUrls,
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).optional(),
});

export class EnvValidationError extends Error {
  constructor(issues) {
    const details = issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
    super(`Invalid environment configuration:\n  ${details.join("\n  ")}`);
    this.name = "EnvValidationError";
    this.issues = issues;
  }
}

export function parseEnv(source) {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    throw new EnvValidationError(result.error.issues);
  }

  return Object.freeze(result.data);
}

const env = parseEnv(process.env);

export default env;
