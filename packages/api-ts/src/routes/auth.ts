import express, { Request, Response } from 'express';
import { currentUser } from '@sgtickets/common';
import { PrismaClient } from '@prisma/client'
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError, currentUser } from './middlewares';

import { Password } from '../services/password';

const router = express.Router();
const prisma = new PrismaClient()

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
    console.log(req.currentUser)
    res.send({ currentUser: req.currentUser || null });
  });

router.post(
    '/api/users/signup',
    [
      body('email').isEmail().withMessage('Email must be valid'),
      body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const { email, password } = req.body;
      
      const prisma = new PrismaClient() 
      const existingUser = await prisma.user.findFirst({
        where: {
          email
        }
      });
  
      if (existingUser) {
        throw new BadRequestError('Email in use');
      }
  
      const hashedPw = await Password.toHash(password)
  
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPw
        } 
      });
  
      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );
  
      // Store it on session object
      req.session = {
        jwt: userJwt,
      };
  
      res.status(201).send(user);
    }
    );
    
    router.post(
        '/api/users/signin',
        [
            body('email').isEmail().withMessage('Email must be valid'),
            body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password'),
        ],
        validateRequest,
        async (req: Request, res: Response) => {
            const { email, password } = req.body;
            
            const existingUser = await prisma.user.findFirst({
                where: {
                    email
                }
            });
            
            if (!existingUser) {
                throw new BadRequestError('Invalid credentials');
            }
            
            const passwordsMatch = await Password.compare(
                existingUser.password,
                password
                );
                if (!passwordsMatch) {
                    throw new BadRequestError('Invalid Credentials');
                }
                
                // Generate JWT
                const userJwt = jwt.sign(
                    {
                        id: existingUser.id,
                        email: existingUser.email,
                    },
                    process.env.JWT_KEY!
                    );
                    
                    // Store it on session object
                    req.session = {
                        jwt: userJwt,
                    };
                    
                    res.status(200).send(existingUser);
                }
                );
    
router.post('/api/users/signout', (req, res) => {
    req.session = null;
  
    res.send({});
  });
            
    

          
              