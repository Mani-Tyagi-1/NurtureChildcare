import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const spacesEndpoint = new AWS.Endpoint('syd1.digitaloceanspaces.com'); // Use your region
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY!,
  secretAccessKey: process.env.DO_SPACES_SECRET!,
  signatureVersion: 'v4',
  region: 'syd1', // Optional; change if you use another region
});

export default s3;
