import {type Request , type Response } from 'express'
import { prisma } from '../config/prisma.js';
import bcrypt from 'bcrypt'


export const postRegister =async(req : Request , res :Response) =>{
   try {
       const { username, email, password } = req.body;
       if (!username || !email || !password) {
           res.status(400).json({ message: 'Vui lòng điền đầy đủ tất cả các trường!' });
           return;
       }

       const existingUser = await prisma.user.findUnique({
           where: { email }
       })
       if (existingUser) {
           res.status(400).json({ message: 'Email này đã tồn tại trên hệ thống!' });
           return;
       }

       const salt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(password, salt);
       const registerNewUser = async (
           username: string,
           email: string,
           password: string) => {
           return await prisma.user.create({
               data: {
                   username: username,
                   email: email,
                   password: password
               }
           })
       }

       const newUser = await registerNewUser(username, email, hashPassword);
       res.status(201).json({
           message: 'Đăng ký thành công tài khoản mới!',
           user: {
               id: newUser.id,
               username: newUser.username,
               email: newUser.email
           }
       });
   } catch (error) {
       console.error('Lỗi register:', error);
       res.status(500).json({ message: 'Lỗi hệ thống phía Server!' });
   }
}