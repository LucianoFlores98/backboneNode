import { IUserRepository } from "../../../../../src/modules/users/core/repository/IUserRepository"
import { IHashService } from "../../../../../src/modules/users/core/services/IHashService"
import { getUserActions } from '../../../../../src/modules/users/core/actions/actionsProvider';

describe('actionProvider', () => {

    it("Should return the actions from actionProvider", async() => {
    const userMockedRepository = {
        save: jest.fn(),
        edit: jest.fn(),
        remove: jest.fn(),
        getAll: jest.fn(),
        getOne: jest.fn(),
        getById: jest.fn(),
        login: jest.fn(),
    } as IUserRepository

    const mockHashService = {
        hash: jest.fn(),
        compare: jest.fn(),
    } as IHashService

    const userActions = getUserActions(userMockedRepository,mockHashService);

    expect(userActions).toHaveProperty("save");
    expect(userActions).toHaveProperty("edit");
    expect(userActions).toHaveProperty("remove");
    expect(userActions).toHaveProperty("getAll");
    expect(userActions).toHaveProperty("getOne");
    expect(userActions).toHaveProperty("getById");
    expect(userActions).toHaveProperty("login");
    })

})