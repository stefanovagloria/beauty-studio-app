const { Storage } = require('@google-cloud/storage');

// Replace 'path/to/serviceAccountKey.json' with the path to your service account key JSON file
const storage = new Storage({
  keyFilename: './nefertiti-studio/storage.json',
});

module.exports = storage;
