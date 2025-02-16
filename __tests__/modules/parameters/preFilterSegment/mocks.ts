import { IPreFilterSegmentRepository } from "../../../../src/modules/parameters/preFilterSegment/core/repository/IPreFilterSegmentRepository";
import IPreFilterSegment from "../../../../src/modules/parameters/preFilterSegment/core/entities/IPreFilterSegment";
import { IPreFilterSegmentActions } from "../../../../src/modules/parameters/preFilterSegment/core/actions/actionsProvider";

export const preFilterSegmentRepositoryMock = (): jest.Mocked<IPreFilterSegmentRepository> => ({
    save: jest.fn(),
    edit: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    remove: jest.fn(),
  });

  export const createMockPreFilterSegmentActions = (): jest.Mocked<IPreFilterSegmentActions> => ({
    save: { execute: jest.fn() as jest.Mock<Promise<IPreFilterSegment>> },
    edit: { execute: jest.fn() as jest.Mock<Promise<IPreFilterSegment>> },
    getAll: { execute: jest.fn() as jest.Mock<Promise<IPreFilterSegment[]>> },
    getById: { execute: jest.fn() as jest.Mock<Promise<IPreFilterSegment>> },
    remove: { execute: jest.fn() as jest.Mock<Promise<IPreFilterSegment>> },
  });

  export const mockSegment: IPreFilterSegment = {
    id: 1,
    segment: "Privado",
    days_late_tc: 10,
    days_late_pp: 5,
    global_max_amount: 2000000,
    max_transaction_amount: 1000000,
    affectation: 30,
    global_indebtedness: 65,
    createdAt: new Date(),
    updatedAt: new Date(),
};