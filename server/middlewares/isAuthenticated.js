import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Вы не авторизованы",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid",
        success: false,
      });
    }

    req.id = decode.id;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
