const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const DB_URL = process.env.MONGO_URL;
const conn = mongoose.createConnection(DB_URL);

const downloadFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      chunkSizeBytes: 1024,
      bucketName: 'uploads',
    });

    const readStream = bucket.openDownloadStream(ObjectId(id));
    readStream.pipe(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  downloadFile,
};
