import * as tkRepository from '../repositories/taiKhoanRepository.js'; 

export const protectedRoute = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({message:"Token not found!"});
  }

  let decodedUser;

  try {
    decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(400).json({message:"Access token expired or wrong"});
  }

  const user = await tkRepository.getTKById(decodedUser.tkId);

  if (!user) {
    return res.status(400).json({message:"TK not found"});
  }


  req.user = user;

  next();
};
