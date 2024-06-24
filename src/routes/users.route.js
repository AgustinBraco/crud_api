import { Router } from 'express';
import { isAuth, isAdmin } from '../middlewares/index.js';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/index.js';

export const usersRoute = Router();

// Route -> Controller
usersRoute.get('/', isAuth, isAdmin, getUsers);
usersRoute.get('/:id', isAuth, isAdmin, getUser);
usersRoute.put('/:id', isAuth, isAdmin, updateUser);
usersRoute.delete('/:id', isAuth, isAdmin, deleteUser);
