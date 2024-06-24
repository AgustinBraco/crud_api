import { Router } from 'express';
import { isAuth } from '../middlewares/index.js';
import { registerSession, loginSession, logoutSession, currentSession } from '../controllers/index.js';

export const sessionsRoute = Router();

// Route -> Controller
sessionsRoute.post('/register', registerSession);
sessionsRoute.post('/login', loginSession);
sessionsRoute.get('/logout', isAuth, logoutSession);
sessionsRoute.get('/current', isAuth, currentSession);