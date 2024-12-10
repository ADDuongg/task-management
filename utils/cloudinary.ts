/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary'

export const getPublicIdFromUrl = (url:string) => {
  const regex = /\/v\d+\/(.+)\.(jpg|jpeg|png|gif|webp|svg)$/; 
  const match = url.match(regex);
  return match ? match[1] : null; 
}

export const uploadImageToCloudinary = async (avatar: File | string) => {
  if(typeof avatar === 'string'){
    return avatar
  }
  const bytes = await avatar.arrayBuffer();
  const buffer = new Uint8Array(bytes);

  const uploadResult = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(buffer);
  });

  return uploadResult.secure_url;
};

export const deleteImageToCloudinary = async (fileUrl: string) => {
  const publicId = getPublicIdFromUrl(fileUrl)
  publicId && await cloudinary.uploader.destroy(publicId)
}



