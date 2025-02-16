import { BcryptHashService } from "../../../../../src/modules/users/infrastructure/services/BcryptHashService";

describe("Bcrypt Hashing Service", () => {
  it("should hash a given string correctly", () => {
    const toHash = "password123";
    const bcryptService = BcryptHashService();
    const hashed = bcryptService.hash(toHash);

    expect(hashed).toBeDefined();
    expect(typeof hashed).toBe("string");
  });
});
