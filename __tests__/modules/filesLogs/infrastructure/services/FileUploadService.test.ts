import { describe, beforeEach, expect, it } from '@jest/globals';
import { FileUploadService } from "../../../../../src/modules/filesLogs/infrastructure/services/FileUploadService";
import { generateMockFile } from "../../mocks";

describe('FileUploadService', () => {
  let fileUploadServiceInstance: ReturnType<typeof FileUploadService>;

  beforeEach(() => {
    jest.clearAllMocks();
    fileUploadServiceInstance = FileUploadService();
  });

  describe('upload', () => {
    it('should return the correct file path for a file with an extension', async () => {
      const mockFileWithExtension = generateMockFile("test-file.jpg");
      const result = await fileUploadServiceInstance.upload(mockFileWithExtension, "image");
      expect(result).toBe('files/image-test-file.jpg');
    });

    it('should return the correct file path for a file without an extension', async () => {
      const mockFileWithoutExtension = generateMockFile("test-file");
      const result = await fileUploadServiceInstance.upload(mockFileWithoutExtension, "document");
      expect(result).toBe('files/document-test-file');
    });
  });

  describe('processFile', () => {
    it('should return true or false randomly', async () => {
      const file =  generateMockFile("test-file.jpg");
      const result = await fileUploadServiceInstance.processFile(file);
      expect(typeof result).toBe('boolean');
    });
  });

  describe('convertToBase64', () => {
    it('should throw an error if the file does not exist', async () => {
      const invalidPath = 'non-existent-file.txt';
      await expect(fileUploadServiceInstance.convertToBase64(invalidPath))
        .rejects
        .toThrow('Archivo no encontrado');
    });
  });
});