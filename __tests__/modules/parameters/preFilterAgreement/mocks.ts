import { IPreFilterAgreementRepository } from "../../../../src/modules/parameters/preFilterAgreement/core/repository/IPreFilterAgreementRepository";
import { IPreFilterAgreementActions } from "../../../../src/modules/parameters/preFilterAgreement/core/actions/actionsProvider";
import IPreFilterAgreement from "../../../../src/modules/parameters/preFilterAgreement/core/entities/IPreFilterAgreement";

export const preFilterAgreementRepositoryMock =
  (): jest.Mocked<IPreFilterAgreementRepository> => ({
    save: jest.fn(),
    edit: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    remove: jest.fn(),
  });

export const createMockPreFilterAgreementActions =
  (): jest.Mocked<IPreFilterAgreementActions> => ({
    save: { execute: jest.fn() as jest.Mock<Promise<IPreFilterAgreement>> },
    edit: { execute: jest.fn() as jest.Mock<Promise<IPreFilterAgreement>> },
    getAll: { execute: jest.fn() as jest.Mock<Promise<IPreFilterAgreement[]>> },
    getById: { execute: jest.fn() as jest.Mock<Promise<IPreFilterAgreement>> },
    remove: { execute: jest.fn() as jest.Mock<Promise<IPreFilterAgreement>> },
  });

export const mockAgreement: IPreFilterAgreement = {
  id: "1",
  number: 3,
  name: 'TELECOM',
  typeId: 4,
  createdAt: new Date(),
  updatedAt: new Date(),
};
