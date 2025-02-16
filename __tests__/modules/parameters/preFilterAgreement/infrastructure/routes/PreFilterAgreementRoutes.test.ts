import { Router } from "express";
import { describe, beforeEach, test, expect, jest } from "@jest/globals";
import getPreFilterAgreementRoutes from "../../../../../../src/modules/parameters/preFilterAgreement/infrastructure/routes/PreFilterAgreementRoutes";
import { DependencyManager } from "../../../../../../src/dependencyManager";
import { getPreFilterAgreementControllers } from "../../../../../../src/modules/parameters/preFilterAgreement/infrastructure/controllers/controllersProvider";

jest.mock("express", () => ({
    Router: jest.fn(() => ({
      post: jest.fn(),
      get: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    })),
  }));
  
  jest.mock("../../../../../../src/modules/parameters/preFilterAgreement/infrastructure/controllers/controllersProvider");

describe("getPreFilterAgreementRoutes", () => {
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

    (getPreFilterAgreementControllers as jest.Mock).mockReturnValue(mockControllers);
  });

  test("should set up POST route for /agreements with save handler", () => {
    const agreementRouter = getPreFilterAgreementRoutes(dependencyManager);

    expect(agreementRouter.post).toHaveBeenCalledWith("/agreements", expect.any(Function));
  });

  test("should set up GET route for /agreements with getAll handler", () => {
    const agreementRouter = getPreFilterAgreementRoutes(dependencyManager);

    expect(agreementRouter.get).toHaveBeenCalledWith("/agreements", expect.any(Function));
  });

  test("should set up GET route for /agreements/:id with getById handler", () => {
    const agreementRouter = getPreFilterAgreementRoutes(dependencyManager);

    expect(agreementRouter.get).toHaveBeenCalledWith("/agreements/:id", expect.any(Function));
  });

  test("should set up PATCH route for /agreements/:id with edit handler", () => {
    const agreementRouter = getPreFilterAgreementRoutes(dependencyManager);

    expect(agreementRouter.patch).toHaveBeenCalledWith("/agreements/:id", expect.any(Function));
  });

  test("should set up DELETE route for /agreements/:id with remove handler", () => {
    const agreementRouter = getPreFilterAgreementRoutes(dependencyManager);

    expect(agreementRouter.delete).toHaveBeenCalledWith("/agreements/:id", expect.any(Function));
  });
});
