import { Request, Response, Router, RequestHandler, NextFunction } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';

import UserDao from '@daos/User/UserDao.mock';
import { JwtService } from '@shared/JwtService';
import { paramMissingError, loginFailedErr, cookieProps } from '@shared/constants';
import axios, { AxiosResponse } from 'axios';

import { apiRoot, headers } from '../../config';

const router = Router();

const checkAuth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const jwt = req.signedCookies[cookieProps.key];
    if (!jwt) {
      res.status(UNAUTHORIZED).send('Unauthorized Request')
    } else {
      next();
    }
  }
}


/******************************************************************************
 *                      Account - "GET /api/account"
 ******************************************************************************/

router.get('/account', checkAuth(), async (req: Request, res: Response) => {
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

router.get('/historicalData', checkAuth(), async (req: Request, res: Response) => {
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
 *                      Orders - "GET/POST/DELETE /api/orders"
 ******************************************************************************/

router.get('/orders', checkAuth(), async (req: Request, res: Response, next: RequestHandler) => {
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

router.post('/orders', checkAuth(), async (req: Request, res: Response) => {
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

router.delete('/orders', checkAuth(), async (req: Request, res: Response) => {
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

router.get('/positions', checkAuth(), async (req: Request, res: Response) => {
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

router.get('/assets', checkAuth(), async (req: Request, res: Response) => {
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

router.get('/clock', checkAuth(), async (req: Request, res: Response) => {
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
