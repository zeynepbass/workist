import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const SIGNED_URL_TTL_SECONDS = 300;

export function createS3Storage({
  endpoint,
  region,
  bucket,
  accessKeyId,
  secretAccessKey,
  publicUrl,
  forcePathStyle,
}) {
  const client = new S3Client({
    endpoint,
    region,
    forcePathStyle,
    credentials: { accessKeyId, secretAccessKey },
  });

  const publicBase = publicUrl.replace(/\/$/, "");

  return {
    driver: "s3",

    async save({ key, body, contentType }) {
      await client.send(
        new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }),
      );
    },

    async remove(key) {
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    },

    publicUrl(key) {
      return `${publicBase}/${key}`;
    },

    async download(key, { fileName } = {}) {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
        ...(fileName
          ? { ResponseContentDisposition: `attachment; filename="${encodeURIComponent(fileName)}"` }
          : {}),
      });

      return {
        redirectUrl: await getSignedUrl(client, command, { expiresIn: SIGNED_URL_TTL_SECONDS }),
      };
    },
  };
}
