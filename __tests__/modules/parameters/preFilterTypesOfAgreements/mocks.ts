import { Router } from "express";
import { PreFilterTypeOfAgreementsControllers } from "../../../../src/modules/parameters/preFilterTypesOfAgreements/infrastructure/controllers/PreFilterTypesOfAgreementsControllers";
import { IPreFilterTypesOfAgreementRepository } from "../../../../src/modules/parameters/preFilterTypesOfAgreements/core/repository/IPreFilterTypesOfAgreementsRepository";
import IPreFilterTypesOfAgreements from "../../../../src/modules/parameters/preFilterTypesOfAgreements/core/entities/IPreFilterTypesOfAgreements";
import { IPreFilterTypeOfAgreementActions } from "../../../../src/modules/parameters/preFilterTypesOfAgreements/core/actions/actionsProvider";

export const preFilterTypesOfAgreementsRepositoryMock = (): jest.Mocked<IPreFilterTypesOfAgreementRepository> => ({
    save: jest.fn(),
    edit: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    remove: jest.fn(),
});

export const createMockPreFilterTypeOfAgreementActions = (): jest.Mocked<IPreFilterTypeOfAgreementActions> => ({
    save: { execute: jest.fn() as jest.Mock<Promise<IPreFilterTypesOfAgreements>> },
    edit: { execute: jest.fn() as jest.Mock<Promise<IPreFilterTypesOfAgreements>> },
    getAll: { execute: jest.fn() as jest.Mock<Promise<IPreFilterTypesOfAgreements[]>> },
    getById: { execute: jest.fn() as jest.Mock<Promise<IPreFilterTypesOfAgreements>> },
    remove: { execute: jest.fn() as jest.Mock<Promise<IPreFilterTypesOfAgreements>> },
});

export const router = jest.mock("express", () => ({
    Router: jest.fn(() => ({
        post: jest.fn(),
        get: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
    })),
}));

export const mockControllers = {
    save: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    edit: jest.fn(),
    remove: jest.fn(),
};

export const mockPreFilterType: IPreFilterTypesOfAgreements = {
    id: "1",
    type_of_employer: "01-Seguridad",
    decision: "Avanza",
    createdAt: new Date(),
    updatedAt: new Date(),
};

export type MockPreFilterTypeOfAgreementActions = ReturnType<typeof createMockPreFilterTypeOfAgreementActions>;
export type PreFilterTypeOfAgreementsControllersType = ReturnType<typeof PreFilterTypeOfAgreementsControllers>;
