import { Request, Response } from "express";
import { UserControllers } from "../../../../../src/modules/users/infrastructure/controllers/UserControllers";
import {
  userMocked,
  saveMockAction,
  editMockAction,
  removeMockAction,
  getAllMockAction,
  usersListMocked,
  getByIdMockAction,
  loginMockAction,
  getOneMockAction,
} from "../../mocks";

describe("UserControllers", () => {
  const actions = {
    save: saveMockAction,
    edit: editMockAction,
    remove: removeMockAction,
    getAll: getAllMockAction,
    getById: getByIdMockAction,
    login: loginMockAction,
    getOne: getOneMockAction,
  };

  const { save, edit, remove, getAll, getById, login, getOne } =
    UserControllers(actions);

  it("should create a new user", async () => {
    const req = {
      body: userMocked,
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await save(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 201,
      success: true,
      msg: "Usuario creado correctamente",
      result: userMocked,
      pagination: undefined,
    });
  });

  it("should edit a user", async () => {
    const req = {
      body: userMocked,
      params: {
        id: "1",
      },
    } as Partial<Request>;
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await edit(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      success: true,
      msg: "Usuario editado correctamente",
      result: userMocked,
      pagination: undefined,
    });
  });

  it("should remove a user", async () => {
    const req = {
      body: userMocked,
      params: {
        id: "1",
      },
    } as Partial<Request>;
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await remove(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      success: true,
      msg: "Usuario eliminado correctamente",
      result: undefined,
      pagination: undefined,
    });
  });

  it("should get all users", async () => {
    const req = {} as Partial<Request>;

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      success: true,
      msg: "Usuarios obtenidos con éxito",
      result: usersListMocked,
      pagination: undefined,
    });
  });

  it("should get a user by id", async () => {
    const req = {
      body: userMocked,
      params: {
        id: "1",
      },
    } as Partial<Request>;

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      success: true,
      msg: "Usuario obtenido con éxito",
      result: userMocked,
      pagination: undefined,
    });
  });

  it("should get One user", async () => {
    const req = {
      body: userMocked,
      params: {
        email: "jhon.doe@mail.com",
      },
    } as Partial<Request>;

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getOne(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      success: true,
      msg: "Usuario obtenido con éxito",
      result: userMocked,
      pagination: undefined,
    });
  });

  it("should login a user", async () => {
    const req = {
      body: userMocked,
    } as Partial<Request>;

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      success: true,
      msg: "Inicio de sesión exitoso",
      result: {},
      pagination: undefined,
    });
  });
});
