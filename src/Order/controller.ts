import dbConnect  from "../Utilities/authorization";
import {getDecodedPh} from "../Utilities/verifytoken";
import DBCOnfig from "../Config/config"
import bcrypt from 'bcrypt';
import {Request,Response} from 'express';
import  {makeResponse,makeErrorResponse} from "../Utilities/response_handler";
import jwt from 'jsonwebtoken';
const deviceuc3 = dbConnect.device;
const customeruc3 =dbConnect.customer;
const Op = dbConnect.Sequelize.Op;

// Create and Save a new Tutorial
export const insert = async(req:Request, res:Response) => {
  try{
    const PHONE_NO = getDecodedPh(req,res);
    const condition = PHONE_NO ? { PHONE_NO: { [Op.iLike]: `%${PHONE_NO}%` } } : null;
    const devlopment = await customeruc3.findAll({ where: condition })
    const [customer] = devlopment
      const device = {
        time: req.body.time,
        device: customer.dataValues.DEVICE,
        consumption: req.body.consumption
      };
    const create = await deviceuc3.create(device) 
    res.status(200).json(makeResponse("INSERT SUCESSFUL",create));

  }catch(err:any){
    res.status(500).json(makeErrorResponse("Some error occurred .", err));
  }
};

export const readDeviceAll = async(req:Request, res:Response) => {
  try{
  const PHONE_NO = getDecodedPh(req,res);
  const condition = PHONE_NO ? { PHONE_NO: `${PHONE_NO}`  } : null;

  const devlopment = await customeruc3.findAll({ where: condition })
  const [customer] = devlopment
  const DEVICE = (customer.dataValues.DEVICE)
  const condition2 = DEVICE ? { device: `${DEVICE}`  } : null;
  const findall = await  deviceuc3.findAll({where : condition2 })
  res.status(200).json(makeResponse("READ SUCESSFUL",findall));

  }catch(err:any){
    res.status(500).json(makeErrorResponse("Some error occurred .", err));
  }
};


export const deleteAll = async(req:Request, res:Response) => {
  try{
  const PHONE_NO = getDecodedPh(req,res);
  const condition = PHONE_NO ? { PHONE_NO: `${PHONE_NO}`  } : null;

  const devlopment = await customeruc3.findAll({ where: condition })
  const [customer] = devlopment
  const DEVICE = (customer.dataValues.DEVICE)
  const condition2 = DEVICE ? { device: `${DEVICE}`  } : null;
  const destoy = await  deviceuc3.destroy({where: condition2})
  res.status(200).json(makeResponse("data coloumn were deleted successfully!",destoy));
  }catch(err:any) {
    res.status(500).json(makeErrorResponse("Some error occurred while removing all device.",err));
  }
};


// export const update = (req:Request, res:Response) => {
//   const device = req.params.device;

//   customeruc3.update(req.body, {
//     where: { device: device }
//   })
//     .then((num:any) => {
//       if (num == 1) {
//         res.send({message: "customer was updated successfully."});
//       } else {
//         res.send({message: `Cannot update uc3 with id=${device}. Maybe Tutorial was not found or req.body is empty!`});
//       }
//     })
//     .catch((err:any) => {
//       res.status(500).send({message: "Error updating uc3 with id=" + device});
//     });
// };

export const signup = async(req:Request, res:Response) => {
  try{
  const salt = await bcrypt.genSalt(10);
  const customer = {
    PHONE_NO: req.body.PHONE_NO,
    PASSWORD : await bcrypt.hash(req.body.PASSWORD, salt),
    DEVICE: req.body.DEVICE
  };
  const signup =   customeruc3.create(customer)
        res.status(200).json(makeResponse("SUCESSFUL SIGNUP",signup));
  }catch(err:any){
    res.status(500).json(makeErrorResponse("Some error occurred while creating the uc3.",err));
      };
};

export const signin = async(req:Request, res:Response) => {
   const user = await customeruc3.findOne({ where : {PHONE_NO : req.body.PHONE_NO }});
 if(user){
    let password_valid = await bcrypt.compare(req.body.PASSWORD,user.dataValues.PASSWORD);
    if(password_valid){
        let token = jwt.sign({"PHONE_NO" : user.dataValues.PHONE_NO,"PASSWORD":user.dataValues.PASSWORD },DBCOnfig.token);
        res.status(200).json({message:"SUCESSFUL LOGIN" , token : token });
    } else {
      res.status(400).json({ error : "Password Incorrect"});
    }
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
};