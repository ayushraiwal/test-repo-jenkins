import { v4 as uuidv4 } from 'uuid';
import db from "./../../../config/dbconfig.js";
import { hashPassword } from '../../../config/utils.js';
import { findCustomerByEmail } from '../../modal/AuthModal.js';
import jsonwebtoken from "jsonwebtoken";
import bcrypt from 'bcrypt';

const resolvers = {
  Query: {
    getGroups: async () => {
      console.log(await db.query('SELECT * FROM group_details'));
      const rows = await db.query('SELECT * FROM group_details');
      
      return rows;
    },
    getGroup: async (_, { id }) => {
      const rows = await db.query('SELECT * FROM group_details WHERE _id = ?', [id]);
      return rows[0];
    },
    getUsers: async () => {
      const rows = await db.query('SELECT * FROM users');
      return rows;
    },
    getUser: async (_, { id }) => {
      const rows = await db.query('SELECT * FROM users WHERE _id = ?', [id]);
      return rows[0];
    }
  },
  Mutation: {
    createGroup: async (_, args) => {
      const id = uuidv4();
      const result = await db.query(
        'INSERT INTO group_details (_id, company_name, owner_name, email_id, pancard, adharcard, company_address, pincode, status, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [id, args.company_name, args.owner_name, args.email_id, args.pancard, args.adharcard, args.company_address, args.pincode, args.status, args.created_by]
      );
      return { _id: id, ...args, created_at: new Date().toISOString() };
    },
    updateGroup: async (_, args) => {
      const { _id, ...updateData } = args;
      const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
      const values = Object.values(updateData);
      await db.query(`UPDATE group_details SET ${fields}, updated_at = NOW() WHERE _id = ?`, [...values, _id]);
      const [rows] = await db.query('SELECT * FROM group_details WHERE _id = ?', [_id]);
      return rows[0];
    },
    createUser: async (_, args) => {
      const id = uuidv4();
      const hashedPassword = await hashPassword(args.password);
      const result = await db.query(
        'INSERT INTO users (_id, email_id, username, password, full_name, mobile_number, group_id, role, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [id, args.email_id, args.username, hashedPassword, args.full_name, args.mobile_number, args.group_id, args.role, args.created_by]
      );
      return { _id: id, ...args, created_at: new Date().toISOString() };
    },
    updateUser: async (_, args) => {
      const { _id, ...updateData } = args;
      const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
      const values = Object.values(updateData);
      await db.query(`UPDATE users SET ${fields}, updated_at = NOW() WHERE _id = ?`, [...values, _id]);
      const [rows] = await db.query('SELECT * FROM users WHERE _id = ?', [_id]);
      return rows[0];
    },

    login: async (_, { email_id, password }) => {
      const customerMaster = await findCustomerByEmail(email_id); 
      if (!customerMaster) {
         throw new Error('User not found');
       }

         const isMatch = await bcrypt.compare(password,customerMaster.password)
       if (!isMatch) {
         throw new Error('Invalid password');
       }
       const {  _id, username, full_name, mobile_number, group_id,role} = customerMaster;

       const token = jsonwebtoken.sign(
           { _id, email_id, username, full_name, mobile_number, group_id,role},
               process.env.TOKEN_KEY, // Use a strong secret key
           { expiresIn: '1h' } // Token expiration time
         );
 
       return {  _id, email_id, username, full_name, mobile_number, group_id,role, token};
     }
  }
};

export default resolvers;
