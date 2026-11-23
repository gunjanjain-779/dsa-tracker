const {createProblem}= require('../controller/problem.controller.js');
const authMiddleware= require('../middleware/auth.middleware.js');
const router= require('express').Router();

router.post('/', authMiddleware, createProblem);

module.exports= router;