import { Router } from "express";
import { describe, beforeEach, test, expect, jest } from "@jest/globals";
import getPreFilterTypeOfAgreementRoutes from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/infrastructure/routes/PreFilterTypeOfAgreementRoutes";
import { getPreFilterTypeOfAgreementControllers } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/infrastructure/controllers/controllersProvider";
import { DependencyManager } from "../../../../../../src/dependencyManager";

jest.mock("express", () => ({
    Router: jest.fn(() => ({
        post: jest.fn(),
        get: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
    })),
}));

jest.mock("../../../../../../src/modules/parameters/preFilterTypesOfAgreements/infrastructure/controllers/controllersProvider");

describe("getPreFilterTypesOfAgreementRoutes", () => {
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

        (getPreFilterTypeOfAgreementControllers as jest.Mock).mockReturnValue(mockControllers);
    });

    test("should set up POST route for /types-of-agreements with save handler", () => {
        const typeAgreementRouter = getPreFilterTypeOfAgreementRoutes(dependencyManager);

        expect(typeAgreementRouter.post).toHaveBeenCalledWith("/types-of-agreements", expect.any(Function));
    });

    test("should set up GET route for /types-of-agreements with getAll handler", () => {
        const typeAgreementRouter = getPreFilterTypeOfAgreementRoutes(dependencyManager);

        expect(typeAgreementRouter.get).toHaveBeenCalledWith("/types-of-agreements", expect.any(Function));
    });

    test("should set up GET route for /types-of-agreements/:id with getById handler", () => {
        const typeAgreementRouter = getPreFilterTypeOfAgreementRoutes(dependencyManager);

        expect(typeAgreementRouter.get).toHaveBeenCalledWith("/types-of-agreements/:id", expect.any(Function));
    });

    test("should set up PATCH route for /types-of-agreements/:id with edit handler", () => {
        const typeAgreementRouter = getPreFilterTypeOfAgreementRoutes(dependencyManager);

        expect(typeAgreementRouter.patch).toHaveBeenCalledWith("/types-of-agreements/:id", expect.any(Function));
    });

    test("should set up DELETE route for /types-of-agreements/:id with remove handler", () => {
        const typeAgreementRouter = getPreFilterTypeOfAgreementRoutes(dependencyManager);

        expect(typeAgreementRouter.delete).toHaveBeenCalledWith("/types-of-agreements/:id", expect.any(Function));
    });
});
