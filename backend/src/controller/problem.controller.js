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
const getProblem = async(req,res,next)=>{
    try{
        const {topic,status,difficulty}= req.query;
        const filter= {user:req.userId};
        if(topic!==undefined){
            if(typeof topic !== 'string' || !topic.trim()){
                return res.status(400).json({message:"Invalid field"});
            }
            filter.topic=topic;
        }
        if(status!==undefined){
            if(typeof status !== 'string' || !status.trim()){
                return res.status(400).json({message:"Invalid field"});
            }
            filter.status= status;
        }
        if(difficulty!==undefined){
            if(typeof difficulty !='string' || !difficulty.trim()){
                return res.status(400).json({message:"Invalid field"});
            }
            filter.difficulty= difficulty;
        }
        const problems= await Problem.find(filter);
        return res.status(200).json({problems});
        
    }catch(error){
        next(error)
    }
}
const getProblemById= async (req,res,next) => {
    try{
       const id= req.params.id;
       const filter= {_id:id, user:req.userId};
       const problem = await Problem.findOne(filter);
       if(!problem){
        return res.status(404).json({message:"Problem not found"})
       }
       return res.status(200).json({problem});
    }catch(err){
        next(err);
    }
}
module.exports = { createProblem, getProblem, getProblemById };