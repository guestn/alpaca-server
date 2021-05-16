import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import { cookieProps } from '@shared/constants';
import cors from 'cors';

// Init express
const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieProps.secret));
app.use(cors());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

app.use((req, res, next) => {
    console.log('aha');
    next();
});

if (process.env.NODE_ENV === 'development') {
    const proxyMiddleware = createProxyMiddleware({
        target: 'http://localhost:3500',
        changeOrigin: true,
    });

    app.use('/', proxyMiddleware);
}

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
//const clientDir = path.join(__dirname, './client/public');
const clientDir =
    process.env.NODE_ENV === 'development'
        ? path.join(__dirname, '../client/public')
        : path.join(__dirname, './client/public');

app.set('views', viewsDir);
const staticDir =
    process.env.NODE_ENV === 'development'
        ? path.join(__dirname, '../client/public')
        : path.join(__dirname, './client/public');
app.use(express.static(staticDir));

// app.get('/login', (req: Request, res: Response) => {
//   const jwt = req.signedCookies[cookieProps.key];

//   if (jwt) {
//     console.log('is LOGGED IN')
//     return res.redirect('/');
//     //return res.redirect('http://localhost:3000/index.html');
//   }
//   return res.redirect('/');
// });

app.get('/', (req: Request, res: Response) => {
    console.log('login if not logged in', req.originalUrl);
    const jwt = req.signedCookies[cookieProps.key];
    if (!jwt) {
        return res.sendFile('login.html', { root: viewsDir });
    } else {
        console.log('resredirect');
        return res.sendFile('index.html', { root: clientDir });
    }
});

// app.get('/*', (req: Request, res: Response) => {
//   //console.log('GET ALERTS');
//   //return res.sendFile('index.html', { root: clientDir })
// });

// app.get('/orders', (req: Request, res: Response) => {
//   console.log('ORDERS');
// })

// app.get('/users', (req: Request, res: Response) => {
//   const jwt = req.signedCookies[cookieProps.key];
//   if (!jwt) {
//     res.redirect('/');
//   } else {
//     res.sendFile('users.html', { root: viewsDir });
//   }
// });

// app.get('/alerts', (req: Request, res: Response) => {
//   const jwt = req.signedCookies[cookieProps.key];
//   if (!jwt) {
//     res.redirect('/');
//   } else {
//     res.redirect('http://localhost:3000/alerts');
//   }
// });

// Export express instance
export default app;
