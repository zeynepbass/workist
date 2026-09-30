import { validationFailed } from "../utils/AppError.js";

function formatIssues(issues, source) {
  return issues.map((issue) => ({
    path: [source, ...issue.path].join("."),
    message: issue.message,
  }));
}

export function validate(schemas) {
  return (req, res, next) => {
    const validated = {};
    const issues = [];

    for (const [source, schema] of Object.entries(schemas)) {
      const result = schema.safeParse(req[source] ?? {});

      if (result.success) {
        validated[source] = result.data;
      } else {
        issues.push(...formatIssues(result.error.issues, source));
      }
    }

    if (issues.length > 0) {
      return next(validationFailed(issues));
    }

    req.validated = validated;
    return next();
  };
}
