import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';
import { JwtService } from '@shared/JwtService';
import { paramMissingError, loginFailedErr, cookieProps } from '@shared/constants';
import { getUserByEmail, getUserById } from './User';

const router = Router();
const jwtService = new JwtService();

/******************************************************************************
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/

router.post('/login', async (req: Request, res: Response) => {
    console.log('/login');

    let jwt = req.signedCookies[cookieProps.key];

    // If jwt present and valid, return user directly
    if (jwt) {
        const clientData = await jwtService.decodeJwt(jwt);
        const { user, error } = await getUserById(clientData.id.toString());

        if (user) {
            return res.json({ name: user.name, email: user.email, role: user.role, id: user.id });
        }
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    // Check email and password present
    const { email, password } = req.body;
    if (!(email || !password)) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    // Fetch user
    const { user, error } = await getUserByEmail(email);
    if (!user || error) {
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

    const { key, options } = cookieProps;

    res.cookie(key, jwt, options);

    // Return logged in user JSON
    return res.json({ name: user.name, email: user.email, role: email.role, id: user.id });
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
