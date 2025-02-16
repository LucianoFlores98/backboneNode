import { Router } from "express";
import { describe, beforeEach, test, expect, jest } from "@jest/globals";
import getPreFilterPipeRoutes from "../../../../../../src/modules/parameters/preFilterPipe/infrastructure/routes/PreFilterPipeRoutes";
import { DependencyManager } from "../../../../../../src/dependencyManager";
import { getPreFilterControllers } from "../../../../../../src/modules/parameters/preFilterPipe/infrastructure/controllers/controllersProvider";

jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  })),
}));

jest.mock("../../../../../../src/modules/parameters/preFilterPipe/infrastructure/controllers/controllersProvider");

describe("getPreFilterPipeRoutes", () => {
  let dependencyManager: DependencyManager;
  let router: jest.Mocked<ReturnType<typeof Router>>;

  beforeEach(() => {
    dependencyManager = new DependencyManager();
    router = Router() as jest.Mocked<ReturnType<typeof Router>>;

    const mockControllers = {
      save: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      edit: jest.fn(),
      remove: jest.fn(),
    };

    (getPreFilterControllers as jest.Mock).mockReturnValue(mockControllers);
  });

  test("should set up POST route for /pipes with save handler", () => {
    const pipeRouter = getPreFilterPipeRoutes(dependencyManager);

    expect(pipeRouter.post).toHaveBeenCalledWith("/pipes", expect.any(Function));
  });

  test("should set up GET route for /pipes with getAll handler", () => {
    const pipeRouter = getPreFilterPipeRoutes(dependencyManager);

    expect(pipeRouter.get).toHaveBeenCalledWith("/pipes", expect.any(Function));
  });

  test("should set up GET route for /pipes/:id with getById handler", () => {
    const pipeRouter = getPreFilterPipeRoutes(dependencyManager);

    expect(pipeRouter.get).toHaveBeenCalledWith("/pipes/:id", expect.any(Function));
  });

  test("should set up PATCH route for /pipes/:id with edit handler", () => {
    const pipeRouter = getPreFilterPipeRoutes(dependencyManager);

    expect(pipeRouter.patch).toHaveBeenCalledWith("/pipes/:id", expect.any(Function));
  });

  test("should set up DELETE route for /pipes/:id with remove handler", () => {
    const pipeRouter = getPreFilterPipeRoutes(dependencyManager);

    expect(pipeRouter.delete).toHaveBeenCalledWith("/pipes/:id", expect.any(Function));
  });
});
