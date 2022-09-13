import db  from "../Utilities/authorization";
import verifytoken from "../Utilities/verifytoken";
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
const deviceuc3 = db.uc3;
const customeruc3 =db.customer;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
export const create = async(req:express.Request, res:express.Response) => {
  const PHONE_NO = verifytoken.getDecodedPh(req,res);
  
  // customeruc3.findByPk(PHONE_NO)
  // .then((data:express.Response) => {
  //   res.send(data);
  // })
  var condition = PHONE_NO ? { PHONE_NO: { [Op.iLike]: `%${PHONE_NO}%` } } : null;

  const dev = await customeruc3.findAll({ where: condition })
  const [customer] = dev
   console.log(customer.dataValues.DEVICE)

    const uc3 = {
      time: req.body.time,
      device: customer.dataValues.DEVICE,
      consumption: req.body.consumption
    };
    deviceuc3.create(uc3)
      .then((data:express.Response) => {
        res.send(data);
      })
      .catch((err:any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the uc3."
        });
      });
};

export const findAll = (req:any, res:any) => {
    deviceuc3.findAll()
      .then((data:any) => {
        res.send(data);
      })
      .catch((err:any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving uc3."
        });
      });
};


export const deleteAll = (req:express.Request, res:express.Response) => {
    deviceuc3.destroy({
      where: {},
      truncate: true
    })
      .then((nums:express.Response) => {
        res.send({ message: `${nums} uc3 were deleted successfully!` });
      })
      .catch((err:any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all uc3."
        });
      });
};


export const update = (req:express.Request, res:express.Response) => {
  const device = req.params.device;

  customeruc3.update(req.body, {
    where: { device: device }
  })
    .then((num:any) => {
      if (num == 1) {
        res.send({
          message: "customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update uc3 with id=${device}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch((err:any) => {
      res.status(500).send({
        message: "Error updating uc3 with id=" + device
      });
    });
};

export const signup = async(req:express.Request, res:express.Response) => {
  const salt = await bcrypt.genSalt(10);
    const customer = {
      PHONE_NO: req.body.PHONE_NO,
      PASSWORD : await bcrypt.hash(req.body.PASSWORD, salt),
      DEVICE: req.body.DEVICE
    };
    customeruc3.create(customer)
      .then((data:any) => {
        res.send(data);
      })
      .catch((err:any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the uc3."
        });
      });
};

export const signin = async(req:express.Request, res:express.Response) => {
  const SECRET = "eiuehdufedfeifh";
   const user = await customeruc3.findOne({ where : {PHONE_NO : req.body.PHONE_NO }});
   console.log(req.body.PASSWORD);
 if(user){
    let password_valid = await bcrypt.compare(req.body.PASSWORD,user.dataValues.PASSWORD);
    if(password_valid){
        let token = jwt.sign({"PHONE_NO" : user.dataValues.PHONE_NO,"PASSWORD":user.dataValues.PASSWORD },SECRET);
        res.status(200).json({ token : token });
    } else {
      res.status(400).json({ error : "Password Incorrect" });
    }
  
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
  
  };