import { Storage } from "aws-amplify";

export async function S3UploadMiddleware(file) {
  const fn = `${Date.now()}-${file.name}`; //Creates unique time-based filename.

  const store = await Storage.vault.put(fn, file, { //vault is specifically for private S3 puts.
    contentType: file.type,
  });

  return store.key;
}