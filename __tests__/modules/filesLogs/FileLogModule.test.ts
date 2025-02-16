import { describe, it, expect, jest } from '@jest/globals';
import { FileLogModuleInitializer } from '../../../src/modules/filesLogs/fileLogModule';
import { DependencyManager } from '../../../src/dependencyManager';
import { FileLoadRepository } from '../../../src/modules/filesLogs/infrastructure/repository/FileLoadRepository';
import { FileUploadService } from '../../../src/modules/filesLogs/infrastructure/services/FileUploadService';

jest.mock('../../../src/modules/filesLogs/infrastructure/repository/FileLoadRepository');
jest.mock('../../../src/modules/filesLogs/infrastructure/services/FileUploadService');

describe('FileLogModuleInitializer', () => {
  it('should register dependencies in dependency manager', () => {
    const mockDependencyManager = {
      register: jest.fn()
    } as unknown as DependencyManager;

    const mockFileLoadRepository = {};
    const mockFileUploadService = {};

    (FileLoadRepository as jest.Mock).mockReturnValue(mockFileLoadRepository);
    (FileUploadService as jest.Mock).mockImplementation(() => mockFileUploadService);

    FileLogModuleInitializer(mockDependencyManager);

    expect(mockDependencyManager.register).toHaveBeenCalledTimes(2);
    expect(mockDependencyManager.register).toHaveBeenCalledWith('fileLoadRepository', mockFileLoadRepository);
    expect(mockDependencyManager.register).toHaveBeenCalledWith('fileUploadService', mockFileUploadService);
  });

  it('should create new instances of repository and service', () => {
    const mockDependencyManager = {
      register: jest.fn()
    } as unknown as DependencyManager;

    FileLogModuleInitializer(mockDependencyManager);

    expect(FileLoadRepository).toHaveBeenCalledTimes(1);
    expect(FileUploadService).toHaveBeenCalledTimes(1);
  });

  it('should handle dependency manager without register method', () => {
    const invalidDependencyManager = {} as DependencyManager;

    expect(() => FileLogModuleInitializer(invalidDependencyManager))
      .toThrow(TypeError);
  });
});
