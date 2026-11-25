const {createProblem,getProblem,getProblemById,deleteProblem}= require('../controller/problem.controller.js');
const authMiddleware= require('../middleware/auth.middleware.js');
const router= require('express').Router();

router.post('/', authMiddleware, createProblem);
router.get('/', authMiddleware, getProblem);
router.get('/:id',authMiddleware,getProblemById);
router.delete('/:id',authMiddleware,deleteProblem);

module.exports= router;