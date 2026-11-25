const Problem = require('../models/problem.js');

const createProblem = async (req, res, next) => {
    try {
        const { title, link, topic, difficulty } = req.body;
        if (
            typeof title !== 'string' || !title.trim() ||
            typeof link !== 'string' || !link.trim() ||
            typeof topic !== 'string' || !topic.trim() ||
            !difficulty
        ) {
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
        console.log(error.message);
        next(error)
    }
}
const getProblem = async (req, res, next) => {
    try {
        const { topic, status, difficulty } = req.query;
        const filter = { user: req.userId };
        if (topic !== undefined) {
            if (typeof topic !== 'string' || !topic.trim()) {
                return res.status(400).json({ message: "Invalid field" });
            }
            filter.topic = topic;
        }
        if (status !== undefined) {
            if (typeof status !== 'string' || !status.trim()) {
                return res.status(400).json({ message: "Invalid field" });
            }
            filter.status = status;
        }
        if (difficulty !== undefined) {
            if (typeof difficulty != 'string' || !difficulty.trim()) {
                return res.status(400).json({ message: "Invalid field" });
            }
            filter.difficulty = difficulty;
        }
        const problems = await Problem.find(filter);
        return res.status(200).json({ problems });

    } catch (error) {
        next(error)
    }
}
const getProblemById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const filter = { _id: id, user: req.userId };
        const problem = await Problem.findOne(filter);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" })
        }
        return res.status(200).json({ problem });
    } catch (err) {
        next(err);
    }
}

const deleteProblem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const filter = { _id: id, user: req.userId };
        const deleted = await Problem.findOneAndDelete(filter);
        if (deleted == null) {
            return res.status(404).json({ message: "Problem not found" });
        }
        return res.status(200).json({ message: "Problem deleted" });
    } catch (error) {
        next(error);
    }
};
const updateProblem = async (req, res, next) => {
    try {
        const { title, link, topic, difficulty } = req.body;
        const id = req.params.id;
        const update = {};
        if (title !== undefined) {
            if (typeof title !== 'string' || !title.trim()) {
                return res.status(400).json({ message: "Invalid field" });
            }
            update.title = title;
        }
        if (link !== undefined) {
            if (typeof link !== 'string' || !link.trim()) {
                return res.status(400).json({ message: "Invalid field" });
            }
            update.link = link;
        }
        if (topic !== undefined) {
            if (typeof topic !== 'string' || !topic.trim()) {
                return res.status(400).json({ message: "Invalid field" });
            }
            update.topic = topic;
        }
        if (difficulty !== undefined) {
            if (typeof difficulty !== 'string' || !difficulty.trim() || !['Easy', 'Medium', 'Hard'].includes(difficulty)) {
                return res.status(400).json({ message: "Invalid field" });
            }
            update.difficulty = difficulty;
        }
        if (Object.keys(update).length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }
        const filter ={_id:id,user:req.userId};
        const updatedProblem = await Problem.findOneAndUpdate(filter,update,{new:true},{runValidators:true});
        if (!updatedProblem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        return res.status(200).json({ message: "Problem updated", problem: updatedProblem });
    } catch (error) {
        next(error)
    }
}
module.exports = { createProblem, getProblem, getProblemById, deleteProblem, updateProblem };