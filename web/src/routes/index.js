import { Router } from 'express';
import { renderMain } from '../controllers/index.js';

const router = Router();

router.use((req, res, next) => {
    res.locals.user = null;
    next();
})

// GET /
router.get('/', renderMain);

export default router;