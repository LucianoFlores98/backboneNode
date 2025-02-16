import { Router } from "express";
import { describe, beforeEach, test, expect, jest } from "@jest/globals";
import getFileLogRoutes from "../../../../../src/modules/filesLogs/infrastructure/routes/FileLogRoutes";
import { DependencyManager } from "../../../../../src/dependencyManager";
import { getFileLogControllers } from "../../../../../src/modules/filesLogs/infrastructure/controllers/controllersProvider";

jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
  })),
}));

jest.mock("../../../../../src/modules/filesLogs/infrastructure/controllers/controllersProvider");

describe("getFileLogRoutes", () => {
  let dependencyManager: DependencyManager;
  let router: jest.Mocked<ReturnType<typeof Router>>;

  beforeEach(() => {
    dependencyManager = new DependencyManager();
    router = Router() as jest.Mocked<ReturnType<typeof Router>>;

    const mockControllers = {
      uploadFile: jest.fn(),
      getRegistersByType: jest.fn(),
    };

    (getFileLogControllers as jest.Mock).mockReturnValue(mockControllers);
  });

  test("should set up POST route for /fileLogs/upload with uploadFile handler", () => {
    const fileLogRouter = getFileLogRoutes(dependencyManager);

    expect(fileLogRouter.post).toHaveBeenCalledWith(
      "/fileLogs/upload",
      expect.any(Function),
      expect.any(Function)  
    );
  });

  test("should set up GET route for /fileLogs with getRegistersByType handler", () => {
    const fileLogRouter = getFileLogRoutes(dependencyManager);

    expect(fileLogRouter.get).toHaveBeenCalledWith(
      "/fileLogs",
      expect.any(Function) 
    );
  });
});
