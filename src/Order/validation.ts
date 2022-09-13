import {IsNumber, validate,validateOrReject} from 'class-validator';
import { devicevaluepass,Customervaluepass } from '../Utilities/type';
export class Devicevalues {
  time: string;
  device: string;
  consumption: number;
}

// function validation(post:Post) {}
let Devicevalue:devicevaluepass = new Devicevalues();

export function validation(req:any,res:any,next:any) { 
  Devicevalue.time = req.body.time;
  Devicevalue.device = req.body.device;
  Devicevalue.consumption = req.body.consumption;
  validate(Devicevalue).then(errors => {
  // errors is an array of validation errors
  if (errors.length > 0) {
    res.status(400).json({errors : 'validation failed. errors: '});
  } else {
    console.log('validation succeed');
    next();
  }
});
};

validateOrReject(Devicevalue).catch(errors => {
  console.log('Promise rejected (validation failed). Errors: ', errors);
});
// or
async function validateOrRejectExample(input:any) {
  try {
    await validateOrReject(input);
  } catch (errors) {
    console.log('Caught promise rejection (validation failed). Errors: ', errors);
  }
}
export class Customervalues {
  PHONE_NO: string;
  PASSWORD: string;
  DEVICE: string;
}

// function validation(post:Post) {}
let Customervalue:Customervaluepass = new Customervalues();

export function validationust(req:any,res:any,next:any) { 
  Customervalue.PHONE_NO = req.body.PHONE_NO;
  Customervalue.PASSWORD = req.body.PASSWORD;
  Customervalue.DEVICE = req.body.DEVICE;
  validate(Customervalue).then(errors => {
  // errors is an array of validation errors
  if (errors.length > 0) {
    res.status(400).json({errors : 'validation failed. errors: '});
  } else {
    console.log('validation succeed');
    next();
  }
});
};
