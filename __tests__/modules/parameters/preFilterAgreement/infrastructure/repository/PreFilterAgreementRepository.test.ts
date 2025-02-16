import { PreFilterAgreementRepository } from "../../.../../../../../../src/modules/parameters/preFilterAgreement/infrastructure/repository/PreFilterAgreementRepository";
import AgreementModel from "../../../../../../src/modules/parameters/preFilterAgreement/infrastructure/models/AgreementModel";
import { mockAgreement } from "../../mocks";

jest.mock("../../../../../../src/modules/parameters/preFilterAgreement/infrastructure/models/AgreementModel");

describe("PreFilterAgreementRepository", () => {
  let repository: ReturnType<typeof PreFilterAgreementRepository>;

  beforeEach(() => {
    repository = PreFilterAgreementRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save an agreement and return the created object", async () => {
    (AgreementModel.create as jest.Mock).mockResolvedValue({
      toJSON: () => mockAgreement,
    });

    const result = await repository.save(mockAgreement);

    expect(AgreementModel.create).toHaveBeenCalledWith({
      ...mockAgreement,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(result).toEqual(mockAgreement);
  });

  it("should edit an agreement and return the updated object", async () => {
    (AgreementModel.update as jest.Mock).mockResolvedValue([1, [{ toJSON: () => mockAgreement }]]);

    const result = await repository.edit(mockAgreement, mockAgreement.id);

    expect(AgreementModel.update).toHaveBeenCalledWith(
      { ...mockAgreement, updatedAt: expect.any(Date) },
      { where: { id: mockAgreement.id }, returning: true }
    );
    expect(result).toEqual(mockAgreement);
  });

  it("should throw an error if the object is not found or updated", async () => {
    (AgreementModel.update as jest.Mock).mockResolvedValue([0, []]);

    await expect(repository.edit(mockAgreement, mockAgreement.id)).rejects.toThrow("Agreement not found or not updated");
  });

  it("should delete an agreement and return the deleted object", async () => {
    (AgreementModel.findOne as jest.Mock).mockResolvedValue({
      destroy: jest.fn(),
      toJSON: () => mockAgreement,
    });

    const result = await repository.remove(mockAgreement.id);

    expect(AgreementModel.findOne).toHaveBeenCalledWith({ where: { id: mockAgreement.id } });
    expect(result).toEqual(mockAgreement);
  });

  it("should return null if the agreement to be deleted is not found", async () => {
    (AgreementModel.findOne as jest.Mock).mockResolvedValue(null);

    const result = await repository.remove(mockAgreement.id);

    expect(AgreementModel.findOne).toHaveBeenCalledWith({ where: { id: mockAgreement.id } });
    expect(result).toBeNull();
  });

  it("should return a list of agreements matching the query", async () => {
    (AgreementModel.findAll as jest.Mock).mockResolvedValue([{ toJSON: () => mockAgreement }]);

    const result = await repository.getAll({});

    expect(AgreementModel.findAll).toHaveBeenCalledWith({ where: {}, order: [["createdAt", "ASC"]] });
    expect(result).toEqual([mockAgreement]);
  });

  it("should return an agreement if the id is found", async () => {
    (AgreementModel.findOne as jest.Mock).mockResolvedValue({ toJSON: () => mockAgreement });

    const result = await repository.getById(mockAgreement.id);

    expect(AgreementModel.findOne).toHaveBeenCalledWith({ where: { id: mockAgreement.id } });
    expect(result).toEqual(mockAgreement);
  });

  it("should return null if the agreement is not found with id", async () => {
    (AgreementModel.findOne as jest.Mock).mockResolvedValue(null);

    const result = await repository.getById(mockAgreement.id);

    expect(AgreementModel.findOne).toHaveBeenCalledWith({ where: { id: mockAgreement.id } });
    expect(result).toBeNull();
  });
});
