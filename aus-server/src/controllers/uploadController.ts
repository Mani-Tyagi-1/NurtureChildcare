import { Request, Response } from 'express';
import s3 from '../utils/s3';
import { v4 as uuid } from 'uuid';

export const generateTestimonialUploadURL = async (_req: Request, res: Response) => {
  try {
    const fileName = `aus/testimonials/${uuid()}.jpg`; // unique name
    const params = {
      Bucket: process.env.DO_SPACES_BUCKET!,
      Key: fileName,
      Expires: 60, // URL expires in 60 seconds
      ContentType: 'image/jpeg', // frontend will use correct type
      // ACL: 'public-read',
    };

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);

    const publicURL = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${fileName}`;

    res.json({ uploadURL, publicURL });
  } catch (err) {
    console.error('Error generating upload URL:', err);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
};

export const generateBlogImageUploadURL = async (_req: Request, res: Response) => {
  try {
    const fileName = `aus/blogs/${uuid()}.jpg`; // ✅ folder for blogs
    const params = {
      Bucket: process.env.DO_SPACES_BUCKET!,
      Key: fileName,
      Expires: 60,
      ContentType: 'image/jpeg',
      // ACL: 'public-read',
    };

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    const publicURL = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${fileName}`;
    res.json({ uploadURL, fileUrl: publicURL }); // match this naming in frontend
  } catch (err) {
    res.status(500).json({ error: 'Could not generate upload URL' });
  }
};

export const generateNewsletterUploadURL = async (_req: Request, res: Response) => {
  try {
    const fileName = `aus/newsletters/${uuid()}.pdf`;
    const params = {
      Bucket: process.env.DO_SPACES_BUCKET!,
      Key: fileName,
      Expires: 60,
      ContentType: 'application/pdf',
      // ACL: 'public-read',
    };

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);

    const publicURL = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${fileName}`;

    res.json({ uploadURL, fileUrl: publicURL });
  } catch (err) {
    console.error('Error generating newsletter upload URL:', err);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
};

export const generateGalleryUploadURL = async (req: Request, res: Response) => {
  try {
    const { filename, filetype } = req.query;

    if (!filename || !filetype) {
      return res.status(400).json({ error: 'Filename and filetype are required' });
    }

    const fileExt = (filename as string).split('.').pop();
    const fileName = `aus/gallery/${uuid()}.${fileExt}`;

    const params = {
      Bucket: process.env.DO_SPACES_BUCKET!,
      Key: fileName,
      Expires: 60,
      ContentType: filetype as string,
    };

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${fileName}`;

    res.json({ uploadURL, fileUrl });
  } catch (err) {
    console.error('Failed to generate gallery upload URL:', err);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
};



export const generateFounderUploadURL = async (req: Request, res: Response) => {
  try {
    const { filename, contentType } = req.body;

    if (!filename || !contentType) {
      return res
        .status(400)
        .json({ error: "Filename and contentType are required" });
    }

    const fileExt = filename.split(".").pop();
    const fileName = `aus/founders/${uuid()}.${fileExt}`;

    const params = {
      Bucket: process.env.DO_SPACES_BUCKET!,
      Key: fileName,
      Expires: 60,
      ContentType: contentType,
    };

    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    const fileUrl = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${fileName}`;

    res.json({ uploadURL, fileUrl });
  } catch (err) {
    console.error("Failed to generate founder upload URL:", err);
    res.status(500).json({ error: "Failed to generate founder upload URL" });
  }
};