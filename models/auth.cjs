import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;






const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {

    if (!authHeader){
     return  res.send("user not authorize")
      }else{
        const token = authHeader.split(" ")[1];
    if (!token) {
    return  res.json("no token");
    } else {
      
       verify(token, "MySEcretToken", (error, user) => {
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


export default auth
