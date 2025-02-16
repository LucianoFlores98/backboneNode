import { Router } from "express";
import { describe, beforeEach, test, expect, jest } from "@jest/globals";
import getRucRoutes from "../../../../../src/modules/ruc/infrastructure/routes/RucRoutes";
import { DependencyManager } from "../../../../../src/dependencyManager";
import { getRucControllers } from "../../../../../src/modules/ruc/infrastructure/controllers/controllersProvider";
import { createMockRouter, createMockControllers } from "../../mocks";

jest.mock("express", () => ({
    Router: jest.fn(() => createMockRouter()),
}));

jest.mock("../../../../../src/modules/ruc/infrastructure/controllers/controllersProvider");

describe("getRucRoutes", () => {
    let dependencyManager: DependencyManager;
    let router: jest.Mocked<ReturnType<typeof Router>>;

    beforeEach(() => {
        dependencyManager = new DependencyManager();
        router = Router() as jest.Mocked<ReturnType<typeof Router>>;
        const mockControllers = createMockControllers();
        (getRucControllers as jest.Mock).mockReturnValue(mockControllers);
    });

    test("should set up POST route for /ruc with save handler", () => {
        const rucRouter = getRucRoutes(dependencyManager);
        expect(rucRouter.post).toHaveBeenCalledWith("/ruc", expect.any(Function));
    });

    test("should set up GET route for /ruc with getAll handler", () => {
        const rucRouter = getRucRoutes(dependencyManager);
        expect(rucRouter.get).toHaveBeenCalledWith("/ruc", expect.any(Function));
    });
});
