const { checkSchema, validationResult } = require("express-validator");

exports.validate = (schema) => {
    return [
        checkSchema(schema),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array()[0].msg });
            }
            next();
        },
    ];
};