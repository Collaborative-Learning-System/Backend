import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(imageBase64: string, publicId?: string): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(imageBase64, {
        public_id: publicId,
        folder: 'profile_pictures',
        resource_type: 'image',
        transformation: [
          { width: 300, height: 300, crop: 'fill' },
          { quality: 'auto:good' },
        ],
      });
      
      return result.secure_url;
    } catch (error) {
      throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
    }
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.warn(`Failed to delete image from Cloudinary: ${error.message}`);
    }
  }
}