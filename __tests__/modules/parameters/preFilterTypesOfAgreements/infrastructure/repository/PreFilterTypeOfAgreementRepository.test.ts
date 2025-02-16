import { PreFilterTypeOfAgreementRepository } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/infrastructure/repository/PreFilterTypeOfAgreementRepository";
import TypesAgreements from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/infrastructure/models/TypeAgreementModel";
import { mockPreFilterType } from "../../mocks";

jest.mock("../../../../../../src/modules/parameters/preFilterTypesOfAgreements/infrastructure/models/TypeAgreementModel");

describe("PreFilterTypeOfAgreementRepository", () => {
    let repository: ReturnType<typeof PreFilterTypeOfAgreementRepository>;

    beforeEach(() => {
        repository = PreFilterTypeOfAgreementRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should save a type of agreement and return the created object", async () => {
        (TypesAgreements.create as jest.Mock).mockResolvedValue({
            toJSON: () => mockPreFilterType,
        });

        const result = await repository.save(mockPreFilterType);

        expect(TypesAgreements.create).toHaveBeenCalledWith({
            ...mockPreFilterType,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
        expect(result).toEqual(mockPreFilterType);
    });

    it("should edit a type of agreement and return the updated object", async () => {
        (TypesAgreements.update as jest.Mock).mockResolvedValue([1, [{ toJSON: () => mockPreFilterType }]]);

        const result = await repository.edit(mockPreFilterType, mockPreFilterType.id);

        expect(TypesAgreements.update).toHaveBeenCalledWith(
            { ...mockPreFilterType, updatedAt: expect.any(Date) },
            { where: { id: mockPreFilterType.id }, returning: true }
        );
        expect(result).toEqual(mockPreFilterType);
    });

    it("should throw an error if the object is not found or updated", async () => {
        (TypesAgreements.update as jest.Mock).mockResolvedValue([0, []]);

        await expect(repository.edit(mockPreFilterType, mockPreFilterType.id)).rejects.toThrow("Tipo de convenio no encontrado");
    });

    it("should delete a type of agreement and return the deleted object", async () => {
        (TypesAgreements.findOne as jest.Mock).mockResolvedValue({
            destroy: jest.fn(),
            toJSON: () => mockPreFilterType,
        });

        const result = await repository.remove(mockPreFilterType.id);

        expect(TypesAgreements.findOne).toHaveBeenCalledWith({ where: { id: mockPreFilterType.id } });
        expect(result).toEqual(mockPreFilterType);
    });

    it("should return null if the type of agreement to be deleted is not found", async () => {
        (TypesAgreements.findOne as jest.Mock).mockResolvedValue(null);

        const result = await repository.remove(mockPreFilterType.id);

        expect(TypesAgreements.findOne).toHaveBeenCalledWith({ where: { id: mockPreFilterType.id } });
        expect(result).toBeNull();
    });

    it("should return a list of types of agreements matching the query", async () => {
        (TypesAgreements.findAll as jest.Mock).mockResolvedValue([{ toJSON: () => mockPreFilterType }]);

        const result = await repository.getAll({});

        expect(TypesAgreements.findAll).toHaveBeenCalledWith({ where: {}, order: [["createdAt", "ASC"]] });
        expect(result).toEqual([mockPreFilterType]);
    });

    it("should return a type of agreement if the id is found", async () => {
        (TypesAgreements.findOne as jest.Mock).mockResolvedValue({ toJSON: () => mockPreFilterType });

        const result = await repository.getById(mockPreFilterType.id);

        expect(TypesAgreements.findOne).toHaveBeenCalledWith({ where: { id: mockPreFilterType.id } });
        expect(result).toEqual(mockPreFilterType);
    });

    it("should return null if the type of agreement is not found with id", async () => {
        (TypesAgreements.findOne as jest.Mock).mockResolvedValue(null);

        const result = await repository.getById(mockPreFilterType.id);

        expect(TypesAgreements.findOne).toHaveBeenCalledWith({ where: { id: mockPreFilterType.id } });
        expect(result).toBeNull();
    });
});
