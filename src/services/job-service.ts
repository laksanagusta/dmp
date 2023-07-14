import { PgDataSource } from "../config/ormconfig";
import { Job } from "../entities/Job";
import {
  createJobValidation,
  updateJobValidation,
} from "../validation/job-validation";
import { validate } from "../validation/validation";
import JobRepository from "../repositories/job-repository";
import { ResponseError } from "../error/response-error";
import { DeleteResult } from "typeorm";

const jobRepository = new JobRepository();

const create = async (request: any): Promise<Job> => {
  const job: Job = validate(createJobValidation, request.body);

  const jobRepository = PgDataSource.getRepository(Job);

  return await jobRepository.save(job);
};

const update = async (request: any, jobId: number): Promise<Job | null> => {
  const job: Job = validate(updateJobValidation, request.body);

  const existingJob = jobRepository.findById(jobId);
  if (!existingJob) {
    throw new ResponseError(400, "Job data not found");
  }

  job.id = jobId;

  return await jobRepository.save(job);
};

const findById = async (jobId: number): Promise<Job> => {
  const job = await jobRepository.findById(jobId);
  if (!job) {
    throw new ResponseError(400, "Job data not found");
  }

  return job;
};

const findAll = async (params: any): Promise<Job[] | null> => {
  return await jobRepository.findAll(params);
};

const remove = async (jobId: number): Promise<DeleteResult | null> => {
  return await jobRepository.remove(jobId);
};

export default {
  create,
  findById,
  update,
  findAll,
  remove,
};
