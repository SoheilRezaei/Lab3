const Joi = require("joi");

const validator = (schema) => (payload) => 
    schema.validate(payload);

const searchSchema =  Joi.string().alphanum().min(3).max(15);
    
exports.validateSearch = validator(searchSchema);    