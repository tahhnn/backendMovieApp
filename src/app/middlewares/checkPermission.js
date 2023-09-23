import jwt from "jsonwebtoken";
import User from "../models/user";

export const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    //lây token từ header authorization
    if (!token) {
      //kiểm tra nếu chưa có token thì chưa đăng nhập
      return res.status(403).send({
        message: "Bạn chưa đăng nhập",
      });
    }
    const decoded = jwt.verify(token, "46464747");
    //xác thực với mã bí mật
    const user = await User.findById(decoded._id);
    //tìm user có _id được decoded
    if (!user) {
      //nếu có
      return res.status(403).send({
        message: "Không tồn tại user",
        //thì không tồn tại token
      });
    }
    if (user.role !== "admin") {
      //kiểm tra role nếu không phải là admin thì không có quyền thực hiện các chức năng
      return res.send({ message: "Bạn không có quyền làm điều này" });
    }
    next();
  } catch (err) {
    res.send({ message: err.message });
  }
};
