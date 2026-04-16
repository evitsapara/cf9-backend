import { Router } from 'express';
import * as userCtrl from '../controller/user.controller';

const router = Router();

router.get('/email/:email', userCtrl.getOneByEmail);
router.post('/', userCtrl.create);
router.put("/:username", userCtrl.update);

export default router;