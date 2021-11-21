import request from 'supertest';
import { app } from '../../app';
import faker from 'faker';

// CURRENT USER
it('responds with details about the current user', async () => {
  const cookie = await global.signin();

  console.log(cookie);
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});

// SIGNIN

it('fails when a email that does not exist is supplied', async () => {
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'testfakeemailthatdoesnotexist@test.com',
        password: 'password'
      })
      .expect(400);
  });
  
  it('fails when an incorrect password is supplied', async () => {
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'aslkdfjalskdfj'
      })
      .expect(400);
  });
  
  it('responds with a cookie when given valid credentials', async () => {
    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(200);
  
    expect(response.get('Set-Cookie')).toBeDefined();
  });

// SIGNOUT
it('clears the cookie after signing out', async () => {
    const response = await request(app)
      .post('/api/users/signout')
      .send({})
      .expect(200);
  
    expect(response.get('Set-Cookie')[0]).toEqual(
      'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
  });

//SIGNUP

it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: faker.internet.email(),
        password: 'password'
      })
      .expect(201);
  });
  
  it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'alskdflaskjfd',
        password: 'password'
      })
      .expect(400);
  });
  
  it('returns a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'alskdflaskjfd',
        password: 'p'
      })
      .expect(400);
  });
  
  it('returns a 400 with missing email and password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com'
      })
      .expect(400);
  
    await request(app)
      .post('/api/users/signup')
      .send({
        password: 'alskjdf'
      })
      .expect(400);
  });
  
  it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(400);
  });
  
  it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: faker.internet.email(),
        password: 'password'
      })
      .expect(201);
  
    expect(response.get('Set-Cookie')).toBeDefined();
  });