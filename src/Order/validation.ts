import {IsNumber, validate,validateOrReject} from 'class-validator';
export class Post {
  time: string;
  device: string;
  consumption: number;
}
interface valuepass {
  time:string,
  device:string,
  consumption:number
}
// function validation(post:Post) {}
let post:valuepass = new Post();


function validation(req:any,res:any,next:any) { 
  post.time = req.body.time;
  post.device = req.body.device;
  post.consumption = req.body.consumption;
  validate(post).then(errors => {
  // errors is an array of validation errors
  if (errors.length > 0) {
    res.status(400).json({errors : 'validation failed. errors: '});
  } else {
    console.log('validation succeed');
    next();
  }
});
};

validateOrReject(post).catch(errors => {
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

export default {validation}