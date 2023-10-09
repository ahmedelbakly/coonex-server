import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { User, UserCompany } from "../models/userModel.js";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(+process.env.HASH_SALT);
const salt2 = bcrypt.genSaltSync(15);
import jwt from "jsonwebtoken";
import { generateToken } from "../helper/functions.js";
// import { sendMailToUser } from "../helper/nodeMail.js";
const { sign, verify } = jwt;
let refreshTokens = [];

////////////////////////////////////////////////////////////////////

export const createUser = async (req, res, next) => {
  const { username, email, password, agree } = req.body;
  console.log(req.body);
  try {
    if ((username && email && password, agree)) {
      const user =
        (await User.findOne({ email: email })) ||
        (await UserCompany.findOne({ email: email }));
      if (user) {
        return res.json({ error: "this email is registered" });
      }
      if (password.length < 8) {
        return res.json({ error: "password must be at least 8 characters" });
      }

      const hash = bcrypt.hashSync(password, salt);
      const userCreated = await User.create({
        username: username,
        email: email,
        password: hash,
        phone: "01092498555",
        type: "user",
        active: true,
        image: "",
        refreshToken: "",
      });
      const code = 5243;
      // await sendMailToUser(email, "activation Email", code);

      res.json(userCreated);
    } else {
      return res.json({ error: "all fields are required" });
    }
  } catch (error) {
    console.log(error);
  }
};
////////////////////////////////////////////////////////////////////

export const updateUser = async (req, res, next) => {
  console.log(req.body);
  const { id } = req.user;
  const { username, email, phone } = req.body;

  try {
    if (id && username && email && phone) {
      await User.findOneAndUpdate(
        { _id: id },
        {
          username: username,
          email: email,
          phone: phone,
        }
      );
      const user = await User.findOne({ _id: id });
      
      await res.json({user: user, massage: "update successfully"});
    } else {
      res.json("data is error");
    }
  } catch (error) {
    console.log(error);
  }
};
////////////////////////////////////////////////////////////////////

export const updateUserPass = async (req, res, next) => {
  const { password, currentPassword } = req.body;
  const { id } = req.user;
  try {
    if (id && currentPassword && password) {
      const user =
        (await User.findOne({ _id: id })) ||
        (await UserCompany.findOne({ _id: id }));

      if (bcrypt.compare(currentPassword, user.password)) {
        const passHash = await bcrypt.hash(password, salt);
        user.password = passHash;
        await user.save();
        return res.json({ massage: "set password successfully" });
      } else {
        return res.json({ error: "current password is incorrect" });
      }
    } else {
      return res.json({ error: "all filed is required" });
    }
  } catch (error) {
    console.log(error);
  }
};
////////////////////////////////////////////////////////////////////

export const createUserBus = async (req, res, next) => {
  const { companyName, email, password, firstName, lastName, phone } = req.body;
  try {
    if (companyName && email && password && firstName && lastName && phone) {
      const user =
        (await User.findOne({ email: email })) ||
        (await UserCompany.findOne({ email: email }));
      if (user) {
        return res.json("this email is register as person");
      }

      const hash = bcrypt.hashSync(password, salt);
      const userCreated = await UserCompany.create({
        companyName: companyName,
        email: email,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        active: false,
        image: "",
        refreshToken: "",
      });
      res.json(user);
    } else {
      res.json(req.body);
    }
  } catch (error) {
    console.log(error);
  }
};

/////////////////////////////////////////////////////////////
export const updateBusUser = async (req, res, next) => {
  const { companyName, email, firstName, lastName, phone } = req.body;

  if (companyName && email && password && firstName && lastName && phone) {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        companyName: companyName,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      }
    );
    res.json(user);
  } else {
    res.json(req.body);
  }
};

/////////////////////////////////////////////////////////////////

export const updateUserImage = async (req, res, next) => {
  const { id } = req.body;

  try {
    if (id && req.file.filename) {
      await User.findOneAndUpdate(
        { _id: id },
        {
          image: req.file.filename,
        }
      );
      const user = await User.findOne({ _id: id });
      return res.json(user);
    } else {
      res.json(req.body);
    }
  } catch (error) {
    console.log(error);
  }
};

/*{
        _id: user._id,
        username: user.username,
        email: user.email,
        type: user.type,
        phone: user.phone,
        image: user.image,
        active: user.active,
      } */
//////////////////////////////////////////////////////////

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.json({ error: "email and password is required" });
    } else {
      const user =
        (await User.findOne({ email: email })) ||
        (await UserCompany.findOne({ email: email }));

      if (user) {
        if (!user.active) {
          return res.json({ error: "this account is not active" });
        }

        if (await bcrypt.compare(password, user.password)) {
          const token = generateToken(
            user,
            process.env.JWT_SECRET_ACCESS,
            process.env.JWT_SECRET_ACCESS_EXPIRE
          );
          const refreshToken = generateToken(
            user,
            process.env.JWT_SECRET_REFRESH,
            process.env.JWT_SECRET_REFRESH_EXPIRE
          );

          user.refreshToken = refreshToken;
          await user.save();

          return res.json({
            userToken: `Bearer ${token}`,
            refreshToken: refreshToken,
            user: user,
            refreshTokens,
          });
        } else {
          return res.json({ error: "password is incorrect" });
        }
      } else {
        return res.json({ error: "this email is not register" });
      }
    }
  } catch (error) {
    return res.json("error");
  }
};

//////////////////////////////////////////////////////////////////////////////

export const createRefreshToken = async (req, res, next) => {
  const { refreshToken, id } = req.body;

  if (!refreshToken || !id)
    return res.status(403).json("you not authorization");
  const userSelected =
    (await User.findOne({ _id: id })) ||
    (await UserCompany.findOne({ _id: id }));

  if (!userSelected) return res.json("user not found");
  if (userSelected) {
    if (userSelected.refreshToken !== refreshToken) {
      return res.status(403).json("refreshToken is not valid");
    }

    verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH,
      async (error, user) => {
        const newAccessToken = generateToken(
          user,
          process.env.JWT_SECRET_ACCESS,
          process.env.JWT_SECRET_ACCESS_EXPIRE
        );
        const newRefreshToken = generateToken(
          user,
          process.env.JWT_SECRET_REFRESH,
          process.env.JWT_SECRET_REFRESH_EXPIRE
        );
        userSelected.refreshToken = newRefreshToken;
        await userSelected.save();
        console.log("###############", newRefreshToken);
        res.json({
          accessToken: `bearer ${newAccessToken}`,
          refreshToken: newRefreshToken,
        });
      }
    );
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.user;
  console.log("############", id);
  try {
    const user =
      (await User.findOne({ _id: id })) ||
      (await UserCompany.findOne({ _id: id }));
    if (user) {
      const token = generateToken(
        user,
        process.env.JWT_SECRET_ACCESS,
        process.env.JWT_SECRET_ACCESS_EXPIRE
      );
      const refreshToken = generateToken(
        user,
        process.env.JWT_SECRET_REFRESH,
        process.env.JWT_SECRET_REFRESH_EXPIRE
      );

      user.refreshToken = refreshToken;
      await user.save();

      return res.json({
        userToken: `Bearer ${token}`,
        refreshToken: refreshToken,
        user: user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// ********

/*

//create functions to signupUser
exports.signupUser = async (req, res, next) => {
 


  try {
    const { name, email, password, phone, type, subject } = req.body;

    if (!(name && email && password && phone && type && subject)) {
      return res.json("all fields is required");
    } else {
      const user = await userModel.findOne({ email: email });
      if (user) {
        return res.json("user is registered");
      } else {
        const encryptedPassword = await bcrypt.hash(
          password,
          +process.env.SALT
        );

        const newUser = await new userModel({
          name: name,
          email: email,
          password: encryptedPassword,
          phone: phone,
          type: type,
          active: false,
          subject: subject,
        });
        await newUser.save();
        const activeToken = await funHelper.generateToken(
          newUser,
          process.env.JWT_SECRET_VERIFICATION,
          process.env.JWT_SECRET_VERIFICATION_EXPIRE
        );
        // const link = ` http://localhost:5000/api/user/active/${activeToken}`
        const link = ` https://center-app.vercel.app//api/user/active/${activeToken}`;
         await nodeMiller.sendMailToUser(email, "activation Email", link);
          res.status(201).json(newUser)
      }
    }
  } catch (error) {
    res.status(301).json(error);
  }
 };

// ****************************************************************************************
let refreshTokens = [];

exports.createRefreshToken = async (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) res.status(403).json("you not authorization");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("refreshToken is not valid");
  }

  // return console.log("token valid");
  JWT.verify(
    refreshToken,
    process.env.JWT_SECRET_REFRESH,
    async (error, user) => {
      refreshTokens = [];
      const newAccessToken = await funHelper.generateToken(
        user,
        process.env.JWT_SECRET_ACCESS,
        process.env.JWT_SECRET_ACCESS_EXPIRE
      );
      const newRefreshToken = await funHelper.generateToken(
        user,
        process.env.JWT_SECRET_REFRESH,
        process.env.JWT_SECRET_REFRESH_EXPIRE
      );

      refreshTokens.push(newRefreshToken);
      res.json({
        accessToken: `bearer ${newAccessToken}`,
        refreshToken: newRefreshToken,
        refreshTokens: refreshTokens,
      });
    }
  );
};
//create functions to loginUser

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.json("all fields is required");
    } else {
      const user = await userModel.findOne({ email: email });

      if (user) {
        if (!user.active) {
          return res.json(
            "your account not active, please check your email to active your account"
          );
        }

        if (await bcrypt.compare(password, user.password)) {
          const token = await funHelper.generateToken(
            user,
            process.env.JWT_SECRET_ACCESS,
            process.env.JWT_SECRET_ACCESS_EXPIRE
          );
          const refreshToken = await funHelper.generateToken(
            user,
            process.env.JWT_SECRET_REFRESH,
            process.env.JWT_SECRET_REFRESH_EXPIRE
          );
          refreshTokens.push(refreshToken);

          return res.json({
            userToken: `Bearer ${token}`,
            refreshToken: refreshToken,
            user: user,
            refreshTokens,
          });
        } else {
          return res.json("password is incorrect");
        }
      } else {
        return res.json("this email is not registered");
      }
    }
  } catch (error) {
    return res.json("all fields is required");
  }
};
// ****************************************************************************************


//create functions to updateUser
exports.updateUser = async (req, res, next) => {
  try {
    const { id, name, email, password, phone, type } = req.body;
    if (!(id && name && email && password && phone && type)) {
      return res.json("all fields is required");
    } else {
      const encryptedPassword = await bcrypt.hash(password, +process.env.SALT);
      await userModel.findByIdAndUpdate(id, {
        name: name,
        email: email,
        password: encryptedPassword,
        phone: phone,
        type: type,
      });
      return res.json("update user");
    }
  } catch (error) {
    return res.status(301).json(error);
  }
};

// ****************************************************************************************
//create functions to deleteUser
exports.deleteUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.json(" id is required");
    } else {
      const user = await userModel.findByIdAndDelete(req.params.id);
      user && res.json("delete user");
      !user && res.json("user not found");
    }
  } catch (error) {
    // res.status(301).json(error);
  }
};
// **********************************************************
//create functions to getAllStudent
exports.getAllStudent = async (req, res, next) => {
  try {
    const allStudent = await userModel.find({ type: "student" });
    return res.status(201).json(allStudent);
  } catch (error) {
    res.status(301).json(error);
  }
};
// ***************************************************************
//create functions to getAllTeacher
exports.getAllTeacher = async (req, res, next) => {
  try {
    const allTeachers = await userModel.find({ type: "teacher" });
    return res.status(201).json(allTeachers);
  } catch (error) {
    return res.status(301).json(error);
  }
};

//rest password by email

exports.restPass = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(404).json("you must insert your email");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json("user is not register");
    } else {
      const token = await funHelper.generateToken(
        user,
        process.env.JWT_SECRET_ACCESS,
        process.env.JWT_SECRET_ACCESS_EXPIRE
      );

      const link = `http://localhost:3000/user/restPass/${user.id}/${token}`;

      await nodeMiller.sendMailToUser(
        email,
        "rest password",
        `click on this link to rest your password

    link : ${link}
    
    this link is valid to 5 minutes`
      );

      return await res.json({
        token,
        link,
        id: user.id,
      });
    }
  } catch (error) {
    return await res.status(301).send(error);
  }
};

exports.restPassById = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json("all fields is required");
    }
    const { id } = req.params;
    const USER = await userModel.findOne({ _id: id });
    if (!USER) {
      return res.json("user not found");
    } else {
      const hashPassword = await bcrypt.hash(password, +process.env.SALT);
      USER.password = hashPassword;
      await USER.save().then(() => {
        return res.json(USER);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.activeUser = async (req, res, next) => {
  const { token } = req.params;

  try {
    const _id = await JWT.verify(token, process.env.JWT_SECRET_VERIFICATION).id;
    if (!token) {
      return req.json("token not found or not valid");
    } else {
      const signUser = await userModel.findByIdAndUpdate(_id, { active: true });

      return await res.json(signUser);
    }
  } catch (error) {}
};


exports.sendGrid = async(req,res,next)=>{
 await sendGrid.SendEmail("ahmedelbakly258@gmail.com")
res.json("mail is sent")
}


*/
