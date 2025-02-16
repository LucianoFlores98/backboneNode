import { IPreFilterAgeRepository } from "../../../../src/modules/parameters/preFilterAge/core/repository/IPreFilterAgeRepository";
import IPreFilterAge from "../../../../src/modules/parameters/preFilterAge/core/entities/IPreFilterAge";
import { IPreFilterAgeActions } from "../../../../src/modules/parameters/preFilterAge/core/actions/actionsProvider";

export const preFilterAgeRepositoryMock = (): jest.Mocked<IPreFilterAgeRepository> => ({
    save: jest.fn(),
    edit: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    remove: jest.fn(),
  });

  export const createMockPreFilterAgeActions = (): jest.Mocked<IPreFilterAgeActions> => ({
    save: { execute: jest.fn() as jest.Mock<Promise<IPreFilterAge>> },
    edit: { execute: jest.fn() as jest.Mock<Promise<IPreFilterAge>> },
    getAll: { execute: jest.fn() as jest.Mock<Promise<IPreFilterAge[]>> },
    getById: { execute: jest.fn() as jest.Mock<Promise<IPreFilterAge>> },
    remove: { execute: jest.fn() as jest.Mock<Promise<IPreFilterAge>> },
  });

  export const mockAge: IPreFilterAge = {
    id: "1",
    segment: "Publico",
    gender: "Masculino",
    maxAge: 80,
    minAge: 18,
    agePermanence: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  };