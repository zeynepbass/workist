import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ quiet: true });

const booleanString = z.enum(["true", "false"]).transform((value) => value === "true");

const commaSeparatedUrls = z
  .string()
  .min(1)
  .transform((value) => value.split(",").map((url) => url.trim()))
  .pipe(z.array(z.url()).min(1));

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().positive().default(4000),
    MONGO_URI: z
      .string()
      .regex(/^mongodb(\+srv)?:\/\//, "must be a mongodb:// or mongodb+srv:// URI"),
    JWT_ACCESS_SECRET: z.string().min(32, "must be at least 32 characters"),
    ACCESS_TOKEN_TTL: z.string().default("15m"),
    REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(14),
    CLIENT_URL: commaSeparatedUrls,
    COOKIE_SECURE: booleanString.optional(),
    COOKIE_DOMAIN: z.string().optional(),
    TRUST_PROXY: z.coerce.number().int().nonnegative().default(0),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).optional(),
    STORAGE_DRIVER: z.enum(["local", "s3"]).default("local"),
    UPLOAD_DIR: z.string().default("uploads"),
    S3_ENDPOINT: z.url().optional(),
    S3_REGION: z.string().default("auto"),
    S3_BUCKET: z.string().optional(),
    S3_ACCESS_KEY_ID: z.string().optional(),
    S3_SECRET_ACCESS_KEY: z.string().optional(),
    S3_PUBLIC_URL: z.url().optional(),
    S3_FORCE_PATH_STYLE: booleanString.default(false),
  })
  .superRefine((env, context) => {
    if (env.STORAGE_DRIVER !== "s3") {
      return;
    }

    for (const key of ["S3_BUCKET", "S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY", "S3_PUBLIC_URL"]) {
      if (!env[key]) {
        context.addIssue({ code: "custom", path: [key], message: "required when STORAGE_DRIVER=s3" });
      }
    }
  })
  .transform((env) => ({
    ...env,
    COOKIE_SECURE: env.COOKIE_SECURE ?? env.NODE_ENV === "production",
  }));

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
