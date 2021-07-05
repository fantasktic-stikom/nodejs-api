const models = require('../models/index')
const validation = require('../utils/validation.js')
const Joi = require('joi')

class PostController {
    constructor(){}

    // INDEX
    async index(req, res, next) {
        try {
            const posts = await models.posts.findAll({
                include: [
                    {
                        model: models.categories
                    },
                    {
                        model: models.tags
                    }
                ]
            })
            if (posts.length !== 0) {
                return res.json({
                    'success': true,
                    'message': 'Data found',
                    'data': posts
                });
            } else {
                return res.json({
                    'success': true,
                    'message': 'Data is empty',
                    'data': {} 
                });
            }
       } catch (error) {
            return res.status(400).json({
                'success': false,
                'message': error.message
            });
       }
    }

    // SHOW
    async show(req, res, next) {
        try {
            const id = req.params.postId
            const post = await models.posts.findOne({
                where: {
                    id: id
                },  
                include: [
                    {
                        model: models.categories
                    },
                    {
                        model: models.tags
                    }
                ]
            })
            if (post) {
                return res.json({
                    'success': true,
                    'message': 'Data found',
                    'data': post
                });
            } else {
                return res.status(404).json({
                    'success': false,
                    'messages': 'Data not found',
                    'data': {} 
                });
            }
       } catch (error) {
            return res.status(400).json({
                'success': false,
                'message': error.message
            });
       }
    }

    // STORE
    async store(req, res) {
        try {
            const request = req.body
            const validate = Joi.validate(request, validation.postSchema, { abortEarly: false })
            if (validate.error) {
                return res.status(422).json({
                    'messages': 'Validate error',
                    'error': validate.error.details
                })
            }    

            const {
                title,
                content,
                category_id
            } = req.body;

            const post = await models.posts.create({
                title,
                content,
                category_id
            });

            if(post) {
                return res.status(201).json({
                    'success': true,
                    'message': 'Post created successfully',
                    'data': post
                });
            }
        } catch (error) {
            return res.status(400).json({
                'success': false,
                'message': error.message
            });
        }
    }

    // STORE
    async update(req, res) {
        try {
            const id = req.params.postId
            const request = req.body
            const validate = Joi.validate(request, validation.postSchema, { abortEarly: false })
            if (validate.error) {
                return res.status(422).json({
                    'messages': 'Validate error',
                    'error': validate.error.details
                })
            }    

            const {
                title,
                content,
                category_id
            } = req.body;

            const post = await models.posts.update({
                title,
                content,
                category_id
            }, {
                where : {
                    id: id
                }
            });

            if(post) {
                return res.status(200).json({
                    'success': true,
                    'message': 'Post updated successfully'
                });
            }

        } catch (error) {
            return res.status(400).json({
                'success': false,
                'message': error.message
            });
        }
    }

    // DELETE
    async delete(req, res) {
        try {
            const id = req.params.postId

            const check = await models.posts.findOne({
                where: {
                    id: id
                }
            })

            if(!check) {
                return res.status(404).json({
                    'success': false,
                    'messages': 'Data not found'
                });
            }


            const post = models.posts.destroy({
                where : {
                    id: id
                }
            });

            if(post) {
                return res.status(200).json({
                    'success': true,
                    'message': 'Post deleted successfully'
                });
            }

        } catch (error) {
            return res.status(400).json({
                'success': false,
                'message': error.message
            });
        }
    }
}

module.exports = new PostController()