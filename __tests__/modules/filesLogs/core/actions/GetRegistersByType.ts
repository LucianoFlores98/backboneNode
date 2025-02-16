import { GetRegistersByTypeAction } from '../../../../../src/modules/filesLogs/core/actions/GetRegistersByType';
import { UndefinedTypeException } from '../../../../../src/modules/filesLogs/core/exceptions/UndefinedTypeException';
import { fileRepository, mockPaginatedResponse, mockRegisters } from '../../mocks';

describe('GetRegistersByTypeAction', () => {

    it('should return paginated registers when valid type is provided', async () => {

      const action = GetRegistersByTypeAction(fileRepository);

      const result = await action.execute('LEAD', 1, 10);

      expect(fileRepository.getRegistersByType).toHaveBeenCalledWith('LEAD', 1, 10);
      expect(result).toEqual(mockPaginatedResponse);
    });

    it('should throw UndefinedTypeException when type is null', async () => {
      const mockFileRepository = {
        getRegistersByType: jest.fn()
      };

      const action = GetRegistersByTypeAction(fileRepository);

      await expect(action.execute(null))
        .rejects
        .toThrow(UndefinedTypeException);

      expect(mockFileRepository.getRegistersByType).not.toHaveBeenCalled();
    });

    it('should return registers when type is LEAD', async () => {
      const mockFileRepository = {
        getRegistersByType: jest.fn().mockResolvedValue(mockPaginatedResponse)
      };

      const action = GetRegistersByTypeAction(fileRepository);

      const result = await action.execute('LEAD', 1, 10);

      expect(mockFileRepository.getRegistersByType).toHaveBeenCalledWith('LEAD', 1, 10);
      expect(result).toEqual(mockPaginatedResponse);
    });

    it('should return paginated registers when type is CENDEU', async () => {
      const mockFileRepository = {
        getRegistersByType: jest.fn().mockResolvedValue(mockPaginatedResponse)
      };

      const action = GetRegistersByTypeAction(fileRepository);

      const result = await action.execute('CENDEU', 1, 10);

      expect(mockFileRepository.getRegistersByType).toHaveBeenCalledWith('CENDEU', 1, 10);
      expect(result).toEqual(mockPaginatedResponse);
    });

    it('should resolve with repository response when valid type is provided', async () => {
      const mockFileRepository = {
        getRegistersByType: jest.fn().mockResolvedValue(mockPaginatedResponse)
      };

      const action = GetRegistersByTypeAction(fileRepository);

      const result = await action.execute('LEAD', 1, 10);

      expect(mockFileRepository.getRegistersByType).toHaveBeenCalledWith('LEAD', 1, 10);
      expect(result).toEqual(mockPaginatedResponse);
    });
});
