import IPreFilterSegment from "../../core/entities/IPreFilterSegment";
import { IPreFilterSegmentRepository } from "../../core/repository/IPreFilterSegmentRepository";
import SegmentModel from "../models/SegmentModel";

export const PreFilterSegmentRepository = (): IPreFilterSegmentRepository => ({
  async save(segment) {
    const existingSegment = await SegmentModel.findOne({
      where: {
        segment: segment.segment,
      },
    });

    if (existingSegment) {
      throw new Error("Segment with the specified property already exists");
    }

    const segmentCreated = await SegmentModel.create({
      ...segment,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return segmentCreated.toJSON() as IPreFilterSegment;
  },

  async edit(segment, id) {
    if (segment.segment) {
      const existingSegment = await SegmentModel.findOne({
        where: {
          segment: segment.segment,
        },
      });

      if (existingSegment) {
        throw new Error("Segment with the specified property already exists");
      }
    }

    const [affectedCount, updatedSegments] = await SegmentModel.update(
      { ...segment, updatedAt: new Date() },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );

    if (affectedCount === 0 || !updatedSegments || !updatedSegments[0]) {
      throw new Error("Segment not found or not updated");
    }

    return updatedSegments[0].toJSON() as IPreFilterSegment;
  },

  async remove(id) {
    const segmentToDelete = await SegmentModel.findOne({ where: { id } });
    if (!segmentToDelete) {
      return null;
    }

    await segmentToDelete.destroy();
    return segmentToDelete.toJSON() as IPreFilterSegment;
  },

  async getAll(query) {
    const segments = await SegmentModel.findAll({
      where: query,
      order: [
        ["createdAt", "ASC"],
        ["id", "ASC"],
      ], 
    });

    return segments.map((segment) => segment.toJSON() as IPreFilterSegment);
  },

  async getById(id) {
    const segment = await SegmentModel.findOne({
      where: {
        id: id,
      },
    });
    return segment ? (segment.toJSON() as IPreFilterSegment) : null;
  },
});
