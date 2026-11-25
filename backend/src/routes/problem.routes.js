const {createProblem,getProblem,getProblemById,deleteProblem,updateProblem}= require('../controller/problem.controller.js');
const authMiddleware= require('../middleware/auth.middleware.js');
const router= require('express').Router();

router.post('/', authMiddleware, createProblem);
router.get('/', authMiddleware, getProblem);
router.get('/:id',authMiddleware,getProblemById);
router.delete('/:id',authMiddleware,deleteProblem);
router.put('/:id',authMiddleware,updateProblem);

module.exports= router;