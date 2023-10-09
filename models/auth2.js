import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;




// const funHelper =  require("../helper/functions")

const authGet = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {

    if (!authHeader){
     return  res.send("user not authorize")
      }else{
        const token = authHeader.split(" ")[1];
    if (!token) {
    return  res.json("no token");
    } else {
      
       verify(token, "MySEcretRefreshToken", (error, user) => {
        if (error) {
        return  res.json("token no valid");
        }
        req.user = user;
       
        next();
      });
    }
      }
    
  } catch (error) {
    res.json(error);
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////


export default authGet
