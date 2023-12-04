import { google } from "googleapis";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const test = path.normalize(__dirname + "/../../database/apikeys.json");

const auth = new google.auth.GoogleAuth({
  keyFile: test,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const driveService = google.drive({ version: "v3", auth });

export const FileService = {
  createAndUploadFiles: async (MetaData, currentId, parentID) => {
    let fileMetaData = {
      name: MetaData.name,
      mimetype: MetaData.mimetype,
      parents: [parentID],
    };
    let media = {
      mimeType: MetaData.mimetype,
      body: fs.createReadStream(path.normalize(MetaData.tempFilePath)),
    };
    if (currentId !== "null") {
      try {
        await driveService.file.delete({
          fileId: currentId,
        });
      } catch (e) {
        console.log("errror", e.message);
      }
    }
    let response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      fields: "id",
    });
    return response;
  },
};
