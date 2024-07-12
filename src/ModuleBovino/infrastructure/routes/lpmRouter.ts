import { Router } from 'express';
import { LpmController } from '../controllers/lpmController';
import { CreateLpmUseCase } from '../../application/lpmuUseCase/createLpmUseCase';
import { GetLpmUseCase } from '../../application/lpmuUseCase/getLpmUseCase';
import { DeleteLpmUseCase } from '../../application/lpmuUseCase/deleteLpmUseCase';
import { PutLpmUseCase } from '../../application/lpmuUseCase/putLpmUseCase';
import { DbLpmRepository } from '../repositories/dbLpmRepository';

const router = Router();
const lpmRepository = new DbLpmRepository();

const lpmController = new LpmController(
    new CreateLpmUseCase(lpmRepository),
    new GetLpmUseCase(lpmRepository),
    new DeleteLpmUseCase(lpmRepository),
    new PutLpmUseCase(lpmRepository)
);

router.post('/lpms', lpmController.create.bind(lpmController));
router.get('/lpms/:id', lpmController.get.bind(lpmController));
router.delete('/lpms/:id', lpmController.delete.bind(lpmController));
router.put('/lpms/:id', lpmController.update.bind(lpmController));

export default router;
