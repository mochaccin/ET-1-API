import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

async function getMe(req, res) {
	const userId = req.userId;
	try {
		const user = await userModel.findById(userId);

		return res.status(200).json(user);
	} catch (error) {
		response.status(404).send({ error });
	}
}


async function login(request, response) {
    const user = await userModel
      .findOne({ email: request.body.email })
      .select("+password")
      .exec();
  
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }
  
    const passwordIsCorrect = await bcrypt.compare(
      request.body.password,
      user.password
    );
  
    if (!passwordIsCorrect) {
      return response.status(400).send({ message: "Incorrect password" });
    }
  
    const token = generateToken(user);
    const { role } = user;
  
    return response.status(200).send({ token, role });
  }

export { getMe, login };