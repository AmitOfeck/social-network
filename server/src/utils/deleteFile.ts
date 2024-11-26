import fs from 'fs';
import path from 'path';

/**
 * @param fileUrl 
 * @param destinationFolder 
 */
export const deleteFileFromFolder = (fileUrl: string, destinationFolder: string): void => {
  try {
    const filePath = path.join(destinationFolder, fileUrl.split('/').pop()!); 
    fs.unlinkSync(filePath); 
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
};
