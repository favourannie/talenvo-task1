const Joi = require("joi")


const createBoardSchema = Joi.object({
    title: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "Board title is required",
            "string.empty": "Board title cannot be empty",
        }),
    description: Joi.string()
        .optional()
        .trim()
        .messages({
            "string.base": "Description must be a string",
        }),
})

const updateBoardSchema = Joi.object({
    title: Joi.string()
        .optional()
        .trim()
        .messages({
            "string.empty": "Board title cannot be empty",
        }),
    description: Joi.string()
        .optional()
        .trim()
        .messages({
            "string.base": "Description must be a string",
        }),
}).min(1)

const createColumnSchema = Joi.object({
    title: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "Column title is required",
            "string.empty": "Column title cannot be empty",
        })
})

const updateColumnSchema = Joi.object({
    title: Joi.string()
        .optional()
        .trim()
        .messages({
            "string.empty": "Column title cannot be empty",
        }),
    position: Joi.number()
        .optional()
        .messages({
            "number.base": "Position must be a number",
        }),
}).min(1)

const createCardSchema = Joi.object({
    title: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "Card title is required",
            "string.empty": "Card title cannot be empty",
        }),
    description: Joi.string()
        .optional()
        .trim()
        .messages({
            "string.base": "Description must be a string",
        }),
    dueDate: Joi.date()
        .optional()
        .messages({
            "date.base": "Due date must be a valid date",
        }),
})

const updateCardSchema = Joi.object({
    title: Joi.string()
        .optional()
        .trim()
        .messages({
            "string.empty": "Card title cannot be empty",
        }),
    description: Joi.string()
        .optional()
        .trim()
        .messages({
            "string.base": "Description must be a string",
        }),
    dueDate: Joi.date()
        .optional()
        .messages({
            "date.base": "Due date must be a valid date",
        }),
}).min(1)

const setDueDateSchema = Joi.object({
    dueDate: Joi.date()
        .required()
        .messages({
            "any.required": "Due date is required",
            "date.base": "Due date must be a valid date",
        }),
})

const createTagSchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "Tag name is required",
            "string.empty": "Tag name cannot be empty",
        })
})

const createCommentSchema = Joi.object({
    content: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "Comment content is required",
            "string.empty": "Comment content cannot be empty",
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

module.exports = {
    createTagSchema,
    createCommentSchema,
    createBoardSchema,
    updateBoardSchema,
    createColumnSchema,
    updateColumnSchema,
    createCardSchema,
    updateCardSchema,
    setDueDateSchema,
    validate
}
