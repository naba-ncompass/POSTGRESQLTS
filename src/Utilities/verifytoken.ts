import jwt from 'jsonwebtoken';
import dbConfig from "../Config/config";

export function verifyToken(req:any, res:any, next:any){
    try {
      let token = req.rawHeaders[1].split(" ")[1] || req.headers.authorization;
      if (!token) {
        return res.status(401).json({ error :"A token is required for authentication"});   // 401 stands for unauthentication
      }
    } catch (err) {
      return res.status(401).json({ error : "NOT A VALID TOKEN" });
    }
    return next();
};
  
export  function getDecodedPh(req:any,res:any){
    const token = req.rawHeaders[1].split(" ")[1] || req.headers.authorization;
    const decoded:any = jwt.verify(token, dbConfig.token);
    return decoded['PHONE_NO'];
  
}
