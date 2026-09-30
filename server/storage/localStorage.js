import { createReadStream } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

export function createLocalStorage({ rootDir }) {
  const root = path.resolve(rootDir);

  const resolveKey = (key) => {
    const resolved = path.resolve(root, key);

    if (!resolved.startsWith(`${root}${path.sep}`)) {
      throw new Error(`Storage key escapes the upload directory: ${key}`);
    }

    return resolved;
  };

  return {
    driver: "local",
    rootDir: root,

    async save({ key, body }) {
      const target = resolveKey(key);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, body);
    },

    async remove(key) {
      await rm(resolveKey(key), { force: true });
    },

    publicUrl(key) {
      return `/uploads/${key}`;
    },

    async download(key) {
      return { stream: createReadStream(resolveKey(key)) };
    },
  };
}
