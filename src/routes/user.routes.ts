import { Router } from 'express';
import * as userCtrl from '../controller/user.controller';

const router = Router();

router.post('/', userCtrl.create);

export default router;