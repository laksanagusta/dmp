import { NextFunction, Request, Response } from "express";
import jobService from "../services/job-service";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const job = await jobService.create(req);

    res.status(200).json({
      data: job,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobId = parseInt(req.params.id);

    const job = await jobService.update(req, jobId);

    res.status(200).json({
      data: job,
    });
  } catch (e) {
    next(e);
  }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobId = parseInt(req.params.id);
    const job = await jobService.findById(jobId);

    res.status(200).json({
      data: job,
    });
  } catch (e) {
    next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const job = await jobService.findAll(req.query);

    res.status(200).json({
      data: job,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobId = parseInt(req.params.id);
    const job = await jobService.remove(jobId);

    res.status(200).json({
      data: job,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  update,
  create,
  findAll,
  remove,
  findById,
};
