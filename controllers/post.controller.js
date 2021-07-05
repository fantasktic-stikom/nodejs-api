const categories = require('../models/categories');
const models = require('../models/index')

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
                    'messages': 'Data is empty',
                    'data': {} 
                });
            }
       } catch (error) {
            return res.status(400).json({
                'success': false,
                'messages': error.message
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
                    'success': true,
                    'messages': 'Data not found',
                    'data': {} 
                });
            }
       } catch (error) {
            return res.status(400).json({
                'success': false,
                'messages': error.message
            });
       }
    }
}

module.exports = new PostController()