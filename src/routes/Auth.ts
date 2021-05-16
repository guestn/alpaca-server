import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';

import UserDao from '@daos/User/UserDao.mock';
import { JwtService } from '@shared/JwtService';
import { paramMissingError, loginFailedErr, cookieProps } from '@shared/constants';

const router = Router();
const userDao = new UserDao();
const jwtService = new JwtService();

/******************************************************************************
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/

router.post('/login', async (req: Request, res: Response) => {
  console.log('/login');

  let jwt = req.signedCookies[cookieProps.key];

  console.log({ cookieProps });

  

  if (jwt) {
    const clientData = await jwtService.decodeJwt(jwt);
    const user = await userDao.getOneById(clientData.id);
    const parsedUser = {
      name: user?.name,
      email: user?.email,
      role: user?.role,
    };
    return res.json({ user: parsedUser });
  }

  // Check email and password present
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  // Fetch user
  const user = await userDao.getOne(email);
  console.log({ user });
  if (!user) {
    return res.status(UNAUTHORIZED).json({
      error: loginFailedErr,
    });
  }
  // Check password
  const pwdPassed = await bcrypt.compare(password, user.pwdHash);
  if (!pwdPassed) {
    return res.status(UNAUTHORIZED).json({
      error: loginFailedErr,
    });
  }
  console.log({ pwdPassed });
  
  // Setup Admin Cookie
  jwt = await jwtService.getJwt({
    id: user.id,
    role: user.role,
  });
  console.log({ jwt });
  

  const { key, options } = cookieProps;
  console.log({ cookieProps });
  
  res.cookie(key, jwt, options);
  console.log('COOKIE', key, jwt, options);
  return res.json({ user: { email } });
  // return res.status(OK).end();
});

/******************************************************************************
 *                      Logout - "GET /api/auth/logout"
 ******************************************************************************/

router.get('/logout', async (req: Request, res: Response) => {
  console.log('logout');
  const { key, options } = cookieProps;
  res.clearCookie(key, options);
  return res.status(OK).end();
});

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
