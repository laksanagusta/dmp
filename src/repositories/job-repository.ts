import { PgDataSource } from "../config/ormconfig";
import { Job } from "../entities/Job";
import { DeleteResult, Repository } from "typeorm";

export default class JobRepository {
  jobDataSource: Repository<Job>;
  constructor() {
    this.jobDataSource = PgDataSource.getRepository(Job);
  }

  public async save(job: Job): Promise<Job | null> {
    return await this.jobDataSource.save(job);
  }

  public async findById(jobId: number): Promise<Job | null> {
    return await this.jobDataSource.findOne({
      where: {
        id: jobId,
      },
    });
  }

  public async findAll(params: any): Promise<Job[] | null> {
    const jobQuery = this.jobDataSource.createQueryBuilder("job");

    if ("title" in params) {
      jobQuery.where("lower(job.title) LIKE :title", {
        title: `%${params.title.toLowerCase()}%`,
      });
    }

    if ("location" in params) {
      jobQuery.where("lower(job.location) LIKE :location", {
        location: `%${params.location.toLowerCase()}%`,
      });
    }

    if ("description" in params) {
      jobQuery.where("lower(job.description) LIKE :description", {
        description: `%${params.description.toLowerCase()}%`,
      });
    }

    if ("full_time" in params) {
      jobQuery.where("lower(job.full_time) = :full_time", {
        full_time: params.full_time,
      });
    }

    let limit = 20;

    if ("limit" in params) {
      limit = params.limit;
      jobQuery.take(params.limit);
    } else {
      jobQuery.take(limit);
    }

    if ("page" in params) {
      jobQuery.skip((params.page - 1) * limit);
    } else {
      jobQuery.skip(0);
    }

    jobQuery.orderBy("id", "DESC");

    return await jobQuery.getMany();
  }

  public async remove(jobId: number): Promise<DeleteResult> {
    return await this.jobDataSource.delete(jobId);
  }
}
