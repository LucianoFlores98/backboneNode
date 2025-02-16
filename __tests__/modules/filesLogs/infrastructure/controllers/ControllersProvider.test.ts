import { describe, beforeEach, expect, test } from '@jest/globals';
import { getFileLogControllers, getFileLoadRepository, getFileUploadService } from '../../../../../src/modules/filesLogs/infrastructure/controllers/controllersProvider';
import { DependencyManager } from '../../../../../src/dependencyManager';

describe('ControllersProvider', () => {
  let dependencyManager: DependencyManager;

  beforeEach(() => {
    dependencyManager = {
      resolve: jest.fn()
    } as unknown as DependencyManager;
  });

  test('should resolve fileLoadRepository from dependency manager', () => {
    const mockRepository = {  findByFileName: jest.fn().mockResolvedValue({
      id: "1", 
      file_name: 'test_file',
      period: '2021-01',
      status: true,
      type: 'test_type'
    }), };
    jest.mocked(dependencyManager.resolve).mockReturnValue(mockRepository);

    const result = getFileLoadRepository(dependencyManager);

    expect(dependencyManager.resolve).toHaveBeenCalledWith('fileLoadRepository');
    expect(result).toBe(mockRepository);
  });

  test('should resolve fileUploadService from dependency manager', () => {
    const mockService = { upload: jest.fn() };
    jest.mocked(dependencyManager.resolve).mockReturnValue(mockService);

    const result = getFileUploadService(dependencyManager);

    expect(dependencyManager.resolve).toHaveBeenCalledWith('fileUploadService');
    expect(result).toBe(mockService);
  });

  test('should return controllers with resolved dependencies', () => {
    const mockRepository = { findByFileName: jest.fn() };
    const mockService = { upload: jest.fn() };
    
    jest.mocked(dependencyManager.resolve)
      .mockReturnValueOnce(mockRepository)
      .mockReturnValueOnce(mockService);

    const controllers = getFileLogControllers(dependencyManager);

    expect(dependencyManager.resolve).toHaveBeenCalledWith('fileLoadRepository');
    expect(dependencyManager.resolve).toHaveBeenCalledWith('fileUploadService');
    expect(controllers).toBeDefined();
  });

  test('should throw error if dependencies cannot be resolved', () => {
    jest.mocked(dependencyManager.resolve).mockImplementation(() => {
      throw new Error('Dependency not found');
    });

    expect(() => getFileLogControllers(dependencyManager)).toThrow('Dependency not found');
  });
});
