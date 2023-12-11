/**
 * auth.test.js
 * @description :: contains test cases of APIs for authentication module.
 */

const dotenv = require('dotenv');
dotenv.config();
process.env.NODE_ENV = 'test';
const db = require('mongoose');
const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../app');
const authConstant = require('../../constants/authConstant');
const uri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let insertedUser = {};

beforeAll(async function (){
  try {
    await client.connect();
    const dbInstance = client.db('Fictional_E_Commerce_test');
    const user = dbInstance.collection('users');
    insertedUser = await user.insertOne({
      username: 'Leopoldo73',
      password: '3UjGvGtK9W5HufQ',
      email: 'abcd@gmail.com',
      name: 'Karla Willms PhD',
      userType: 851,
      mobileNo: '(216) 662-9209',
      resetPasswordLink: {},
      loginRetryLimit: 420,
      loginReactiveTime: '2024-09-25T03:08:05.923Z',
      ssoAuth: {
        googleId: 'Lucia',
        facebookId: 'Concrete' 
      },
      id: '65727dcb83d92b04d398b64b'
    });
  }
  catch (error) {
    console.error(`we encountered ${error}`);
  }
  finally {
    client.close();
  }
});

// test cases

describe('POST /register -> if email and username is given', () => {
  test('should register a user', async () => {
    let registeredUser = await request(app)
      .post('/admin/auth/register')
      .send({
        'username':'Ned26',
        'password':'AoLFvtHp5tCKAe9',
        'email':'FkCBQjJQBVh5UC3Gzb2yKUpaaR58tVeK_gWp36et_x4bjRWaAD@x.7pFNrHr19-l1_61kM8_5SK3oBJYYsgcXacy.yPyGaWIrGEOXt_t4SEUDcz815d452-51DVr1atjez2j12N1sLw2PTNw8-tr1l.qwhsLFdrcwP2xXaASlUf.0BLrW.a1fm7paPWnmVd6W3W8CXIyIPpYMgYd2F.K7W-i6d9TvIdU3f71XOVN2PxN0VBRTVTALJAhtCgOBQrO3QJRXBCXCDSYdZyDtB-VE-.gc6C3srZ-cT0fcW4JHmA2pfxx76d_vVnVqoLzy_3q1AUVQF2DR6RpLT.BOGS2LaOnuK_lX51.eVWHaNAy8FUFGOl35_-pxLtP_J4YMfqjxdvohHom4_IJWEgCZkF6-qbqeOGgLEROUo6V6VkXlppexdjPEC.w2zjKM4xo5dXmz350GEccZvL0mfdIB4dJUC6ToJ6A_hZ7t3cLpFZLXCIDP6qYbZUb5gKvV-tMsurqTSXqiiNhJBFiGUACQ.bujVA1dt7SFRmxKBX8.HvllCMNAYtvBZgS3A7JzD_CzaAlGwSZGpwgTNvTWDX5_BalWJlWk9ZUQWnMYid-cqiEZIeF7P4u3yTRXYkl8MnhXzy.UfxBwstVeJyCRrQG60yXL6fr2KD2A2WRsUsnsHsVgr6kie0Ek.46xDm9JgQyvtf-MY9tAu37UkcHfmuRrp.bHwotw0ytOREbQKIDMmQQnvM0ci1C7Rc.D676cOep.t-CtB15xmSZUoTwSdHlTR2K3L4fkA0x6Q6-kxbVlhgNBq95eE.zzw/',
        'name':'Shelley Goyette',
        'userType':authConstant.USER_TYPES.Admin,
        'mobileNo':'(065) 212-2548',
        'ssoAuth':{
          'googleId':'architectures',
          'facebookId':'online'
        },
        'addedBy':insertedUser.insertedId,
        'updatedBy':insertedUser.insertedId
      });
    
    expect(registeredUser.statusCode).toBe(200);
    expect(registeredUser.body.status).toBe('SUCCESS');
    expect(registeredUser.body.data).toMatchObject({ id: expect.any(String) });
  });
});

describe('POST /login -> if username and password is correct', () => {
  test('should return user with authentication token', async () => {
    let user = await request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'Ned26',
          password: 'AoLFvtHp5tCKAe9'
        }
      );
      
    expect(user.statusCode).toBe(200);
    expect(user.body.status).toBe('SUCCESS');
    expect(user.body.data).toMatchObject({
      id: expect.any(String),
      token: expect.any(String)
    }); 
  });
});

describe('POST /login -> if username is incorrect', () => {
  test('should return unauthorized status and user not exists', async () => {
    let user = await request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'wrong.username',
          password: 'AoLFvtHp5tCKAe9'
        }
      );

    expect(user.statusCode).toBe(400);
    expect(user.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /login -> if password is incorrect', () => {
  test('should return unauthorized status and incorrect password', async () => {
    let user = await request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'Ned26',
          password: 'wrong@password'
        }
      );

    expect(user.statusCode).toBe(400);
    expect(user.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /login -> if username or password is empty string or has not passed in body', () => {
  test('should return bad request status and insufficient parameters', async () => {
    let user = await request(app)
      .post('/admin/auth/login')
      .send({});

    expect(user.statusCode).toBe(400);
    expect(user.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /forgot-password -> if email has not passed from request body', () => {
  test('should return bad request status and insufficient parameters', async () => {
    let user = await request(app)
      .post('/admin/auth/forgot-password')
      .send({ email: '' });

    expect(user.statusCode).toBe(422);
    expect(user.body.status).toBe('VALIDATION_ERROR');
  });
});

describe('POST /forgot-password -> if email passed from request body is not available in database ', () => {
  test('should return record not found status', async () => {
    let user = await request(app)
      .post('/admin/auth/forgot-password')
      .send({ 'email': 'unavailable.email@hotmail.com', });

    expect(user.statusCode).toBe(200);
    expect(user.body.status).toBe('RECORD_NOT_FOUND');
  });
});

describe('POST /forgot-password -> if email passed from request body is valid and OTP sent successfully', () => {
  test('should return success message', async () => {
    let user = await request(app)
      .post('/admin/auth/forgot-password')
      .send({ 'email':'FkCBQjJQBVh5UC3Gzb2yKUpaaR58tVeK_gWp36et_x4bjRWaAD@x.7pFNrHr19-l1_61kM8_5SK3oBJYYsgcXacy.yPyGaWIrGEOXt_t4SEUDcz815d452-51DVr1atjez2j12N1sLw2PTNw8-tr1l.qwhsLFdrcwP2xXaASlUf.0BLrW.a1fm7paPWnmVd6W3W8CXIyIPpYMgYd2F.K7W-i6d9TvIdU3f71XOVN2PxN0VBRTVTALJAhtCgOBQrO3QJRXBCXCDSYdZyDtB-VE-.gc6C3srZ-cT0fcW4JHmA2pfxx76d_vVnVqoLzy_3q1AUVQF2DR6RpLT.BOGS2LaOnuK_lX51.eVWHaNAy8FUFGOl35_-pxLtP_J4YMfqjxdvohHom4_IJWEgCZkF6-qbqeOGgLEROUo6V6VkXlppexdjPEC.w2zjKM4xo5dXmz350GEccZvL0mfdIB4dJUC6ToJ6A_hZ7t3cLpFZLXCIDP6qYbZUb5gKvV-tMsurqTSXqiiNhJBFiGUACQ.bujVA1dt7SFRmxKBX8.HvllCMNAYtvBZgS3A7JzD_CzaAlGwSZGpwgTNvTWDX5_BalWJlWk9ZUQWnMYid-cqiEZIeF7P4u3yTRXYkl8MnhXzy.UfxBwstVeJyCRrQG60yXL6fr2KD2A2WRsUsnsHsVgr6kie0Ek.46xDm9JgQyvtf-MY9tAu37UkcHfmuRrp.bHwotw0ytOREbQKIDMmQQnvM0ci1C7Rc.D676cOep.t-CtB15xmSZUoTwSdHlTR2K3L4fkA0x6Q6-kxbVlhgNBq95eE.zzw/', });

    expect(user.statusCode).toBe(200);
    expect(user.body.status).toBe('SUCCESS');
  });
});

describe('POST /validate-otp -> OTP is sent in request body and OTP is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'Ned26',
          password: 'AoLFvtHp5tCKAe9'
        }).then(login => () => {
        return request(app)
          .get(`/admin/user/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .post('/admin/auth/validate-otp')
              .send({ 'otp': foundUser.body.data.resetPasswordLink.code, }).then(user => {
                expect(user.statusCode).toBe(200);
                expect(user.body.status).toBe('SUCCESS');
              });
          });
      });
  });
});

describe('POST /validate-otp -> if OTP is incorrect or OTP has expired', () => {
  test('should return invalid OTP', async () => {
    let user = await request(app)
      .post('/admin/auth/validate-otp')
      .send({ 'otp': '12334' });
    expect(user.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(user.body.status).toBe('BAD_REQUEST');
    expect(user.statusCode).toBe(400);
  });
});

describe('POST /validate-otp -> if request body is empty or OTP has not been sent in body', () => {
  test('should return insufficient parameter', async () => {
    let user = await request(app)
      .post('/admin/auth/validate-otp')
      .send({});

    expect(user.statusCode).toBe(400);
    expect(user.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> code is sent in request body and code is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'Ned26',
          password: 'AoLFvtHp5tCKAe9'
        }).then(login => () => {
        return request(app)
          .get(`/admin/user/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .put('/admin/auth/validate-otp')
              .send({
                'code': foundUser.body.data.resetPasswordLink.code,
                'newPassword':'newPassword'
              }).then(user => {
                  
                expect(user.statusCode).toBe(200);
                expect(user.body.status).toBe('SUCCESS');
              });
          });
      });
  });
});

describe('PUT /reset-password -> if request body is empty or code/newPassword is not given', () => {
  test('should return insufficient parameter', async () => {
    let user = await request(app)
      .put('/admin/auth/reset-password')
      .send({});
  
    expect(user.statusCode).toBe(400);
    expect(user.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> if code is invalid', () => {
  test('should return invalid code', async () => {
    let user = await request(app)
      .put('/admin/auth/reset-password')
      .send({
        'code': '123',
        'newPassword': 'testPassword'
      });

    expect(user.statusCode).toBe(400);
    expect(user.body.status).toBe('BAD_REQUEST');
  });
});

afterAll(function (done) {
  db.connection.db.dropDatabase(function () {
    db.connection.close(function () {
      done();
    });
  });
});
