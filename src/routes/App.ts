import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';

import UserDao from '@daos/User/UserDao.mock';
import { JwtService } from '@shared/JwtService';
import { paramMissingError, loginFailedErr, cookieProps } from '@shared/constants';
import { cachedDataVersionTag } from 'v8';
import axios, { AxiosResponse } from 'axios';
const {parse, stringify} = require('flatted');

import { apiRoot, headers } from '../../config';

const router = Router();
const userDao = new UserDao();
const jwtService = new JwtService();


/******************************************************************************
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/

// router.post('/login', async (req: Request, res: Response) => {
//     // Check email and password present
//     const { email, password } = req.body;
//     if (!(email && password)) {
//         return res.status(BAD_REQUEST).json({
//             error: paramMissingError,
//         });
//     }
//     // Fetch user
//     const user = await userDao.getOne(email);
//     console.log({user})
//     if (!user) {
//         return res.status(UNAUTHORIZED).json({
//             error: loginFailedErr,
//         });
//     }
//     // Check password
//     const pwdPassed = await bcrypt.compare(password, user.pwdHash);
//     if (!pwdPassed) {
//         return res.status(UNAUTHORIZED).json({
//             error: loginFailedErr,
//         });
//     }
//     // Setup Admin Cookie
//     const jwt = await jwtService.getJwt({
//         id: user.id,
//         role: user.role,
//     });
//     const { key, options } = cookieProps;
//     res.cookie(key, jwt, options);
//     // Return
//     return res.status(OK).end();
// });


/******************************************************************************
 *                      Account - "GET /api/account"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
  console.log('getAccount')
  axios.get(`${apiRoot}/v2/account`, { headers })
  .then((response: AxiosResponse) => {
    try {
      res.send(response.data);
    }
    catch (e) {
      console.log('ERROR', e)
      res.status(500).send({ error: 'something blew up' })
    }
  });
});


/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
