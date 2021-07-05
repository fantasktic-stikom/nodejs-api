const categories = require('../models/categories');
const models = require('../models/index')

class PostController {
    constructor(){}

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
}

module.exports = new PostController()