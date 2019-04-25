import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../config/database";
import sql from "../models/users";

dotenv.config();

class UserController {
  static signup(req, res) {
    //initial newUser
    const newUser = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password),
      isAdmin: (req.body.isAdmin ? req.body.isAdmin : false),
      type: (req.body.type ? req.body.type : "client")
    };
    pool.query(sql.regUser, [newUser.email, newUser.firstName, newUser.lastName,
      newUser.password, newUser.isAdmin, newUser.type])
      .then((user) => {
        const save = user.rows[0];
        if (save) {
          const payload = {
            id: save.id
          };
          jwt.sign(payload, process.env.secret,
            { expiresIn: "24d" }, (err, token) => {
              if (err) {
                console.log(err);
              }
              return res.status(201).json(
                {
                  status: 201,
                  message: "user created successfully",
                  token: `${token}`,
                  data: {
                    email: save.email,
                    firstname: save.firstname,
                    lastname: save.lastname,
                    isAdmin: save.isAdmin
                  }
                }
              );
            });
        }
      })
      .catch(error => res.status(500).json({ status: 500, error }));
  }

  //signin
  static signin(req, res) {
    //
    pool.query(sql.loginUser, [req.body.email])
      .then((users) => {
        if (users.rows.length !== 0) {
        //
          const user = users.rows[0];
          bcrypt.compare(req.body.password, user.password, (error, matches) => {
            if (error) {
              return res.status(500).json(
                {
                  status: 500,
                  error: "authentication error"
                }
              );
            }
            if (!matches) {
              return res.status(400).json(
                {
                  status: 400,
                  error: "passwords don't match."
                }
              );
            }
            const payload = {
              id: user.id
            };
            jwt.sign(payload, process.env.secret,
              { expiresIn: "24d" }, (err, token) => {
                if (err) {
                  console.log(err);
                }
                return res.status(200).json({
                  status: 200,
                  token: `${token}`,
                  data: {
                    message: "User sucessfully signed in"
                  }
                });
              });
          });
        } else {
          return res.status(400).json({ status: 400, error: "authentication failed." });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default UserController;
