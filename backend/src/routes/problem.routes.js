const {createProblem,getProblem}= require('../controller/problem.controller.js');
const authMiddleware= require('../middleware/auth.middleware.js');
const router= require('express').Router();

router.post('/', authMiddleware, createProblem);
router.get('/', authMiddleware, getProblem);

module.exports= router;