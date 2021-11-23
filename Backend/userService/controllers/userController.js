"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require('lodash');

const db = require('../database');

const sql= require('mssql')
const config= require('../config/index')
const encryptPassword = require('../helpers');

const signUpHandler = async (req, res) => {
  const { firstname, lastname, email, password  } = req.body;

  console.log(req.body);
  const encrypted_password = await encryptPassword(password);
  const { recordset } = await db.query(
    `
    INSERT INTO [normalUsers].[users]
           ([firstname]
           ,[lastname]
           ,[email]
           ,[password]
           ,[isdeleted])
     VALUES
           ('${firstname}'
           ,'${lastname}'
           ,'${email}'
           ,'${encrypted_password}'
           ,'0');
    `
  );

  return res.status(200).json( recordset );
  
}

const signInHandler = async (req, res) => {
  
  const { email, password } = req.body;

  const sql = `SELECT * FROM [normalUsers].[users] WHERE email = '${email}'`;

  const { recordset } =  await db.query(sql);

  const user = recordset[0];

  if(!user) return res.status(401).json({ message: "User does not exist" });

  const validPassword = await bcrypt.compare(password, user.password);

  if(!validPassword) return res.status(400).json({ message: "Invalid Password" });

  const response = _.pick(user, [
      "firstname",
      "lastname",
      "email"
    ]
  )

  jwt.sign({ response }, 'secretkey', (error, token) => {
    return res
      .status(200)
      .json({token});
  });      
  
}

const getUsersHandler = async (req, res) => {

  try {
    
    let pool= await sql.connect(config)
 let user = await pool.request().query(`SELECT * FROM [normalUsers].[users]`);
  
  res.send(user.recordset[0]);
  console.log(user.recordset[0]);

  } catch (error) {
    console.log(error)
  }

}

const putUsersHandler = async (req, res) => {

  const { userID } = req.params;
  const { firstname, lastname, email } = req.body;

  try{

    const { recordset } = await db.query(`UPDATE [normalUsers].[users] SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}'`);
    res.send({ message: `'${taskName}' task updated successfully` });

  } catch(error) {

    res.status(500).send({ message: "Internal Server Error" });

  }

}

const deleteUsersHandler = async (req, res) => {

}


// Finish up on this....

const forgotPasswordHandler = async (req, res) => {

  const { email } = req.body;

  try {

    const { recordset } = await db.query(`SELECT * FROM [normalUsers].[users] WHERE email = '${email}'`);
    const user = recordset[0]
    if(!user) return res.status(404).send({message:"Email does not exist in our database.. try registering"})

    //generate token with email and id in it
    const { id, email, firstname, lastname } = user
    const token = await jwt.sign({id, email}, "secretkey")

    const name = firstname+"  "+lastname
    // await sendEmail(name, token)

    res.send({ message: "An email has been sent with the instructions..." });

  } catch(error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

module.exports = {
  signInHandler,
  signUpHandler,
  getUsersHandler,
  putUsersHandler,
  deleteUsersHandler,
  forgotPasswordHandler
}