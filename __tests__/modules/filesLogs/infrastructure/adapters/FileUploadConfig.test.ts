import { describe, it, expect } from '@jest/globals';
import { Request } from 'express';
import { multerConfig } from '../../../../../src/modules/filesLogs/infrastructure/adapters/FileUploadConfig';
import { generateMockFile } from '../../mocks';

describe('FileUploadConfig', () => {

  it('should filter out files with invalid extensions', () => {
    const req = {} as Request;
    const invalidfile = generateMockFile("example.invalid");
    const validateFile = jest.fn();

    multerConfig.fileFilter(req, invalidfile, validateFile);

    expect(validateFile).toHaveBeenCalledWith(null, false);
  });

  it('should allow files with valid extensions', () => {
    const req = {} as Request;
    const invalidfile = generateMockFile("example.txt"); 
    const validateFile = jest.fn();

    multerConfig.fileFilter(req, invalidfile, validateFile);

    expect(validateFile).toHaveBeenCalledWith(null, true);
  });

  it('should enforce max file size limit', () => {
    const fileSizeLimit = multerConfig.limits.fileSize;
    expect(fileSizeLimit).toBeGreaterThan(0);
  });
});
