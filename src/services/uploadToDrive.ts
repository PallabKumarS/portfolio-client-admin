"use server";

import { google } from "googleapis";
import fs from "fs/promises";
import { createReadStream } from "fs";

// Load and parse service account key from env variable
const serviceAccountKeyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKeyBase64) {
  throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_KEY environment variable");
}

const serviceAccountKey = JSON.parse(
  Buffer.from(serviceAccountKeyBase64, "base64").toString("utf-8")
);

async function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  return google.drive({ version: "v3", auth });
}

export async function uploadResumeFile(formData: FormData) {
  const file = formData.get("file") as File | null;
  const resumeFileId = formData.get("resumeLink") as string | null;

  if (!file || !resumeFileId) {
    throw new Error("Missing file or resumeLink");
  }

  // Convert the Web File to a Buffer and write to /tmp
  const buffer = Buffer.from(await file.arrayBuffer());
  const tmpPath = `/tmp/${file.name}`;
  await fs.writeFile(tmpPath, buffer);

  const drive = await getDriveClient();

  // Update the existing Google Drive file content
  const response = await drive.files.update({
    fileId: resumeFileId,
    media: {
      mimeType: file.type,
      body: createReadStream(tmpPath),
    },
  });

  // Cleanup temp file
  await fs.unlink(tmpPath);

  return {
    success: true,
    fileId: response.data.id,
    driveLink: `https://drive.google.com/file/d/${response.data.id}/view`,
  };
}
