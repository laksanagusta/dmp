import Joi from "joi";

const createJobValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  full_time: Joi.bool().required(),
});

const updateJobValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  full_time: Joi.bool().required(),
});

const getJobValidation = Joi.number().positive().required();

export { createJobValidation, getJobValidation, updateJobValidation };
