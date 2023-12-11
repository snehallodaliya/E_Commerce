const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');

const createSchema = joi.object({
  firstName: joi.string().regex(/^[A-Za-z]+$/).allow(null).allow(''),
  lastName: joi.string().regex(/^[A-Za-z]+$/).allow(null).allow(''),
  name: joi.string().regex(/^[A-Za-z]+$/).allow(null).allow(''),
  profile: joi.string().allow(null).allow(''),
  contactNumber: joi.string().regex(/^[0-9]+$/).allow(null).allow(''),
  email: joi.string().required(),
  isActive: joi.boolean().default(true),
  isDeleted: joi.boolean(),
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

const updateSchema = joi.object({
  firstName: joi.string().regex(/^[A-Za-z]+$/).allow(null).allow(''),
  lastName: joi.string().regex(/^[A-Za-z]+$/).allow(null).allow(''),
  name: joi.string().regex(/^[A-Za-z]+$/).allow(null).allow(''),
  profile: joi.string().allow(null).allow(''),
  contactNumber: joi.string().regex(/^[0-9]+$/).allow(null).allow(''),
  email: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  isActive: joi.boolean().default(true),
  isDeleted: joi.boolean(),
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}
).unknown(true);

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      firstName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      lastName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      profile: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      contactNumber: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      userId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }
    ).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select

}).unknown(true);

module.exports = {
  createSchema,
  updateSchema,
  filterValidationSchema
};