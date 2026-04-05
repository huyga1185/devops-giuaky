import * as authService from '../services/authService.js';

export const logIn = async (req, res) => {
  const { mssv, password } = req.body;

  if (!mssv) {
    return res.status(400).json({message:"mssv not found"});
  }

  if (!password) {
    return res.status(400).json({message:"password not found"});
  }

  try {
    const response = await authService.logIn({ mssv, password });

    res.cookie('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: response.REFRESH_TOKEN_TTL
    });

    return res.status(200).json({message:`${mssv} logged in`, accessToken:response.accessToken});
  } catch (err) {
    console.log(err);
    return res.status(400).json({message:err.message})
  }
};

export const logOut = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (token) {
    try {
      await authService.logOut(token);
      res.clear("refreshToken");
      return res.status(204).send(); 
    } catch (err) {
      console.log(err);
      return res.status(400).json({message:err.message});
    }
  } else {
    return res.status(400).json({message:"token not found"});
  }
}; 

export const refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (token) {
    try {
      const response = await authService.refreshToken(token);
      res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: response.REFRESH_TOKEN_TTL
      });
      return res.status(200).json({ accessToken: response.accessToken });
    } catch (err) {
      console.log(err);
      return res.status(400).json({message:err.message});
    }
  } else {
    return res.status(400).json({message:"token not found"});
  }
};

export const adminLogIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({message:"username not found"});
  }

  if (!password) {
    return res.status(400).json({message:"password not found"});
  }

  try {
    const response = await authService.adminLogIn({ username, password });

    res.cookie('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: response.REFRESH_TOKEN_TTL
    });

    return res.status(200).json({message:`${username} logged in`, accessToken:response.accessToken});
  } catch (err) {
    console.log(err);
    return res.status(400).json({message:err.message})
  };
};

export const checkToken = async (req, res) => {
  res.status(204).send();
};