const Joi = require('joi');
const postSchema    = Joi.object().keys({
                        title: Joi.string().required(),
                        content: Joi.string().required(),
                        category_id: Joi.number().required()
                    })

module.exports = {
    postSchema
}