import bcrypt from 'bcrypt';
import { SuperTest, Test } from 'supertest';

import { User, UserRoles } from '@entities/User';
import UserDao from '@daos/User/UserDao.mock';
import { pwdSaltRounds } from '@shared/constants';


const creds = {
    email: 'nicholas.guest@gmail.com',
    password: 'Bongo902!',
};

export const login = (beforeAgent: SuperTest<Test>, done: any) => {
    // Setup dummy data
    const role = UserRoles.Admin;
    const pwdHash = bcrypt.hashSync(creds.password, pwdSaltRounds);
    const loginUser = new User('Nicholas Guest', creds.email, role, pwdHash);
    console.log({pwdHash})
    spyOn(UserDao.prototype, 'getOne').and.returnValue(Promise.resolve(loginUser));
    // Call Login API
    beforeAgent
        .post('/api/auth/login')
        .type('form')
        .send(creds)
        .end((err: Error, res: any) => {
            if (err) {
                throw err;
            }
            done(res.headers['set-cookie']);
        });
};
