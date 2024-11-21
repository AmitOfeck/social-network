import fs from 'fs';
import path from 'path';

/**
 * פונקציה לשמירת קובץ בתיקייה
 * @param fileBuffer - תוכן הקובץ כ-buffer
 * @param fileName - שם הקובץ
 * @param destinationFolder - נתיב לתיקייה
 * @returns הנתיב היחסי של הקובץ שנשמר
 */
export const saveFileToFolder = (fileBuffer: Buffer, fileName: string, destinationFolder: string): string => {
  try {
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }

    const filePath = path.join(destinationFolder, fileName);

    fs.writeFileSync(filePath, fileBuffer);

    return path.relative(process.cwd(), filePath);
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error('Failed to save file');
  }
};
