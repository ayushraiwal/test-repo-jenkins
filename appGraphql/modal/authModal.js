import db from "../../config/dbconfig.js";

export const findCustomerByEmail = async (email_id) => {
    try {
        console.log("in try")
      const [row] = await db.query('SELECT * FROM users WHERE email_id = ?', [email_id]);
      return row;
    } catch (err) {
        console.log("in c")
      throw err;
    }
  };