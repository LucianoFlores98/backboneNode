import { Router } from "express";
import { describe, beforeEach, test, expect, jest } from "@jest/globals";
import getPreFilterSegmentRoutes from "../../../../../../src/modules/parameters/preFilterSegment/infrastructure/routes/PreFilterSegmentRoutes";
import { DependencyManager } from "../../../../../../src/dependencyManager";
import { getPreFilterSegmentControllers } from "../../../../../../src/modules/parameters/preFilterSegment/infrastructure/controllers/controllersProvider";

jest.mock("express", () => ({
    Router: jest.fn(() => ({
      post: jest.fn(),
      get: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    })),
  }));
  
  jest.mock("../../../../../../src/modules/parameters/preFilterSegment/infrastructure/controllers/controllersProvider");

describe("getPreFilterSegmentRoutes", () => {
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

    (getPreFilterSegmentControllers as jest.Mock).mockReturnValue(mockControllers);
  });

  test("should set up POST route for /segments with save handler", () => {
    const segmentRouter = getPreFilterSegmentRoutes(dependencyManager);

    expect(segmentRouter.post).toHaveBeenCalledWith("/segments", expect.any(Function));
  });

  test("should set up GET route for /segment with getAll handler", () => {
    const segmentRouter = getPreFilterSegmentRoutes(dependencyManager);

    expect(segmentRouter.get).toHaveBeenCalledWith("/segments", expect.any(Function));
  });

  test("should set up GET route for /segments/:id with getById handler", () => {
    const segmentRouter = getPreFilterSegmentRoutes(dependencyManager);

    expect(segmentRouter.get).toHaveBeenCalledWith("/segments/:id", expect.any(Function));
  });

  test("should set up PATCH route for /segments/:id with edit handler", () => {
    const segmentRouter = getPreFilterSegmentRoutes(dependencyManager);

    expect(segmentRouter.patch).toHaveBeenCalledWith("/segments/:id", expect.any(Function));
  });

  test("should set up DELETE route for /segments/:id with remove handler", () => {
    const segmentRouter = getPreFilterSegmentRoutes(dependencyManager);

    expect(segmentRouter.delete).toHaveBeenCalledWith("/segments/:id", expect.any(Function));
  });
});
