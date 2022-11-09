const Joi = require("joi");

const validator = (schema) => (payload) => 
    schema.validate(payload);

const searchSchema =  Joi.string().alphanum().max(20);
    
exports.validateSearch = validator(searchSchema);    