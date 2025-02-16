import { IRucRepository } from "../../../src/modules/ruc/core/repository/IRucRepository";
import IRuc from "../../../src/modules/ruc/core/entities/IRuc";
import { Request, Response } from "express";

export const mockRuc: IRuc = {
    id: "123",
    generatedRuc: "RUC_010.txt",
    leads: "leads_10-2024.txt",
    leadsPeriod: "10-2024",
    cendeuPeriod: "10-2024",
    cendeu: "cendeu_octubre 2024.txt",
    processedRows: 5,
    rucPeriod: "11-2024",
    downloadLink: "https://example.com/ruc_11-2024.txt",
};

export const createMockResponse = (): Partial<Response> => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
});

export const createMockRequest = (body = {}, query = {}): Partial<Request> => ({
    body,
    query,
});

export const mockApiResponses = {
    SuccessResponse: jest.fn((res, status, message, data) =>
        res.status(status).json({ message, data })
    ),
    ErrorResponse: jest.fn((res, error, status) =>
        res.status(status).json({ message: error.message })
    ),
};


export const rucRepositoryMock = (): jest.Mocked<IRucRepository> => ({
    save: jest.fn(),
    getAll: jest.fn(),
    getLastRuc: jest.fn(),
});

export const createMockRucActions = () => ({
    save: {
        execute: jest.fn(),
    },
    getAll: {
        execute: jest.fn(),
    },
    getLastRuc: {
        execute: jest.fn(),
    }
});

export const createMockRouter = () => ({
    post: jest.fn(),
    get: jest.fn(),
});

export const createMockControllers = () => ({
    save: jest.fn(),
    getAll: jest.fn(),
    getRuc: jest.fn(),
});