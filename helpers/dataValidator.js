const Joi = require("joi");

function dataValidator(data) {
  const schema = Joi.object({
    fileName: Joi.string().required(),
    content: Joi.string().required(),
  });

  const result = schema.validate(data);

  return result;
}

module.exports = dataValidator;
