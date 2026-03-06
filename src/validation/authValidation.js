const Joi = require("joi")

const registerSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required",
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters long",
            "any.required": "Password is required",
        }),
    name: Joi.string()
        .optional()
        .messages({
            "string.base": "Name must be a string",
        }),
})

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required",
        }),
    password: Joi.string()
        .required()
        .messages({
            "any.required": "Password is required",
        }),
})

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const message = error.details.map(d => d.message).join(", ");
        return res.status(400).json({ success: false, message });
    }
    next();
};

module.exports = { registerSchema, loginSchema, validate }
