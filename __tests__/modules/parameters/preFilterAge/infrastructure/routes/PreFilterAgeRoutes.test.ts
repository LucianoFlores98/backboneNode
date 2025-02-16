import { Router } from "express";
import { describe, beforeEach, test, expect, jest } from "@jest/globals";
import getPreFilterAgeRoutes from "../../../../../../src/modules/parameters/preFilterAge/infrastructure/routes/PreFilterAgeRoutes";
import { DependencyManager } from "../../../../../../src/dependencyManager";
import { getPreFilterAgeControllers } from "../../../../../../src/modules/parameters/preFilterAge/infrastructure/controllers/controllersProvider";

jest.mock("express", () => ({
    Router: jest.fn(() => ({
      post: jest.fn(),
      get: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    })),
  }));
  
  jest.mock("../../../../../../src/modules/parameters/preFilterAge/infrastructure/controllers/controllersProvider");

describe("getPreFilterAgeRoutes", () => {
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

    (getPreFilterAgeControllers as jest.Mock).mockReturnValue(mockControllers);
  });

  test("should set up POST route for /ages with save handler", () => {
    const ageRouter = getPreFilterAgeRoutes(dependencyManager);

    expect(ageRouter.post).toHaveBeenCalledWith("/ages", expect.any(Function));
  });

  test("should set up GET route for /ages with getAll handler", () => {
    const ageRouter = getPreFilterAgeRoutes(dependencyManager);

    expect(ageRouter.get).toHaveBeenCalledWith("/ages", expect.any(Function));
  });

  test("should set up GET route for /ages/:id with getById handler", () => {
    const ageRouter = getPreFilterAgeRoutes(dependencyManager);

    expect(ageRouter.get).toHaveBeenCalledWith("/ages/:id", expect.any(Function));
  });

  test("should set up PATCH route for /ages/:id with edit handler", () => {
    const ageRouter = getPreFilterAgeRoutes(dependencyManager);

    expect(ageRouter.patch).toHaveBeenCalledWith("/ages/:id", expect.any(Function));
  });

  test("should set up DELETE route for /ages/:id with remove handler", () => {
    const ageRouter = getPreFilterAgeRoutes(dependencyManager);

    expect(ageRouter.delete).toHaveBeenCalledWith("/ages/:id", expect.any(Function));
  });
});
