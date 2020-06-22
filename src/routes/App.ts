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

router.get('/account', async (req: Request, res: Response) => {
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
 *                      Account - "GET /api/historicaldata"
 ******************************************************************************/

router.get('/historicalData', async (req: Request, res: Response) => {
  console.log('getHistoricalData', req.query);
  const params = {
    before: req.query.before,
    limit: req.query.limit,
    symbols: req.query.symbols,
  };

  axios.get(`https://data.alpaca.markets/v1/bars/${req.query.timeframe}`, { headers, params })
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
 *                      Orders - "GET /api/orders"
 ******************************************************************************/

router.get('/orders', async (req: Request, res: Response) => {
  console.log('getOrders', req.query);

  axios.get(`${apiRoot}/v2/orders`, { headers, params: req.query })
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

router.post('/orders', async (req: Request, res: Response) => {
  console.log('Post Orders', req.body);

  axios.post(`${apiRoot}/v2/orders`, req.body, { headers })
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

router.delete('/orders', async (req: Request, res: Response) => {
  console.log('Delete Order', req.body, req.params, req.query);

  axios.delete(`${apiRoot}/v2/orders/${req.query.id}`, { headers })
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
 *                      Positions - "GET /api/positions"
 ******************************************************************************/

router.get('/positions', async (req: Request, res: Response) => {
  console.log('getPositions');

  axios.get(`${apiRoot}/v2/positions`, { headers })
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
 *                      Assets - "GET /api/assets"
 ******************************************************************************/

router.get('/assets', async (req: Request, res: Response) => {
  console.log('assets');

  axios.get(`${apiRoot}/v2/assets`, { headers })
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
 *                      Clock - "GET /api/clock"
 ******************************************************************************/

router.get('/clock', async (req: Request, res: Response) => {
  console.log('clock');

  axios.get(`${apiRoot}/v2/clock`, { headers })
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
