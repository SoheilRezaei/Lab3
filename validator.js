const Joi = require("joi");

const validator = (schema) => (payload) => 
    schema.validate(payload);

const searchSchema =  Joi.string().alphanum();
    
exports.validateSearch = validator(searchSchema);    