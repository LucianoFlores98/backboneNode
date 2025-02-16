import { jest } from "@jest/globals";
import { IPreFilterPipeRepository } from "../../../../src/modules/parameters/preFilterPipe/core/repository/IPreFilterPipeRepository";
import { IPreFilterPipeActions } from "../../../../src/modules/parameters/preFilterPipe/core/actions/actionsProvider";
import IPreFilterPipe from "../../../../src/modules/parameters/preFilterPipe/core/entities/IPreFilterPipe";

export const createMockPreFilterPipeRepository = (): jest.Mocked<IPreFilterPipeRepository> => ({
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  remove: jest.fn(),
  edit: jest.fn(),
});

export const createMockPreFilterPipeActions = (): jest.Mocked<IPreFilterPipeActions> => ({
  save: { execute: jest.fn() },
  getAll: { execute: jest.fn() },
  getById: { execute: jest.fn() },
  remove: { execute: jest.fn() },
  edit: { execute: jest.fn() },
});

export const mockPipe: IPreFilterPipe = {
  id: "1",
  key: "test-key",
  value: "test-value",
  order: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
