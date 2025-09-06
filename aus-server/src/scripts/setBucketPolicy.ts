// src/scripts/setBucketPolicy.ts
import s3 from '../utils/s3';

const setPolicy = async () => {
  const bucket = 'aus'; // your DO bucket name
//   const folder = 'aus/testimonials/'; // folder inside bucket

  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "PublicReadForTestimonialFolder",
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        // Resource: [`arn:aws:s3:::${bucket}/${folder}*`],
        Resource: [`arn:aws:s3:::${bucket}/*`],
      },
    ],
  };

  try {
    await s3
      .putBucketPolicy({
        Bucket: bucket,
        Policy: JSON.stringify(policy),
      })
      .promise();

    console.log("✅ Bucket policy applied successfully.");
  } catch (err) {
    console.error("❌ Failed to apply bucket policy:", err);
  }
};

setPolicy();
