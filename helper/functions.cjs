// import jsonwebtoken
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

//********************************************************** */
// create function to create access-token  with three parameter
export const generateToken = (userLog, secret, expire) => {
  const accessToken = sign(
    {
      id: userLog._id,
      username : userLog.username,
      type:userLog.type
    },
    secret,
    { expiresIn: expire }
  );
  return accessToken;
};
//************************************************************************** */

//create verify function to verify user authorize or not
export const verifyToken = async (req, res, next) => {
  const authHeader = await req.headers.authorization;
  if (authHeader) {
    // const token = authHeader.split(" ")[1];
    const token = authHeader;
    console.log("token is :" + token);
   const variation = await verify(token, "MySEcretToken", (error, user) => {
      if (error) {
        res.status(404).json("token not valid");
      }
      req.user = user;
      console.log(req.user);
      next();
    });
  } else {
    res.status(403).json("user not authorization");
  }
};
export const verifyTokenActive = async (req, res, next) => {
  const {authHeader} = req.params;
  if (authHeader) {
    // const token = authHeader.split(" ")[1];
    const token = authHeader;
    console.log("token is :" + token);
   const variation = await  verify(token, "MySEcretToken", (error, user) => {
      if (error) {
        res.status(404).json("token not valid");
      }
      req.user = user;
      console.log(req.user);
      next();
    });
  } else {
    res.status(403).json("user not authorization");
  }
};
