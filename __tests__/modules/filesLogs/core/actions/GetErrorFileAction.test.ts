import { describe, beforeEach, expect, jest } from "@jest/globals";
import { GetErrorFileAction } from "../../../../../src/modules/filesLogs/core/actions/GetErrorFileAction";
import { fileRepository, fileUploadService, newFileMock, existingFileMock } from "../../mocks";
import fs from "fs";

jest.mock("fs");

describe("GetErrorFileAction", () => {
    const getErrorFileAction = GetErrorFileAction(fileRepository, fileUploadService);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should throw an error if no fileLog is found for the given period and type", async () => {
        fileRepository.findByPeriodAndType.mockResolvedValueOnce(null);

        await expect(getErrorFileAction.execute(newFileMock.period!, newFileMock.type!)).rejects.toThrow(
            "Archivo de error no encontrado para los parámetros especificados."
        );

        expect(fileRepository.findByPeriodAndType).toHaveBeenCalledWith(newFileMock.period!, newFileMock.type!);
        expect(fs.existsSync).not.toHaveBeenCalled();
        expect(fileUploadService.convertToBase64).not.toHaveBeenCalled();
    });

    it("should throw an error if error_file_name is not present in the fileLog", async () => {
        fileRepository.findByPeriodAndType.mockResolvedValueOnce(existingFileMock);

        await expect(getErrorFileAction.execute(newFileMock.period!, newFileMock.type!)).rejects.toThrow(
            "Archivo de error no encontrado para los parámetros especificados."
        );

        expect(fileRepository.findByPeriodAndType).toHaveBeenCalledWith(newFileMock.period!, newFileMock.type!);
        expect(fs.existsSync).not.toHaveBeenCalled();
        expect(fileUploadService.convertToBase64).not.toHaveBeenCalled();
    });

    it("should throw an error if the specified file does not exist in the filesystem", async () => {
        fileRepository.findByPeriodAndType.mockResolvedValueOnce(newFileMock);
        (fs.existsSync as jest.Mock).mockReturnValueOnce(false);

        const errorFileName = newFileMock.error_file_name!;
        await expect(getErrorFileAction.execute(newFileMock.period!, newFileMock.type!)).rejects.toThrow(
            "El archivo especificado no existe en el sistema de archivos."
        );

        expect(fileRepository.findByPeriodAndType).toHaveBeenCalledWith(newFileMock.period!, newFileMock.type!);
        expect(fs.existsSync).toHaveBeenCalledWith(expect.stringContaining(errorFileName));
        expect(fileUploadService.convertToBase64).not.toHaveBeenCalled();
    });

    it("should return the file name and base64 if the file exists", async () => {
        fileRepository.findByPeriodAndType.mockResolvedValueOnce(newFileMock);
        (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
        fileUploadService.convertToBase64.mockResolvedValueOnce("mockedBase64");

        const errorFileName = newFileMock.error_file_name!;
        const result = await getErrorFileAction.execute(newFileMock.period!, newFileMock.type!);

        expect(result).toEqual({
            fileName: errorFileName,
            base64: "mockedBase64",
        });

        expect(fileRepository.findByPeriodAndType).toHaveBeenCalledWith(newFileMock.period!, newFileMock.type!);
        expect(fs.existsSync).toHaveBeenCalledWith(expect.stringContaining(errorFileName));
        expect(fileUploadService.convertToBase64).toHaveBeenCalledWith(expect.stringContaining(errorFileName));
    });
});
