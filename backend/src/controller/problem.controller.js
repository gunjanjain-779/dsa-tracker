const Problem = require('../models/problem.js');

const createProblem = async (req, res, next) => {
    try {
        const { title, link, topic, difficulty } = req.body;
        if (
            typeof title !== 'string' || !title.trim() ||
            typeof link !== 'string' || !link.trim() ||
            typeof topic !== 'string' || !topic.trim() ||
            !difficulty
        ){
            return res.status(400).json({ message: 'Title, link, topic and difficulty are required' });
        };
        if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
            return res.status(400).json({
                message: "Invalid difficulty value"
            })
        }
        const problem = await Problem.create({
            user: req.userId,
            title,
            link,
            topic,
            difficulty
        })
        res.status(201).json({
            message: "Problem created successfully",
            problem
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { createProblem };