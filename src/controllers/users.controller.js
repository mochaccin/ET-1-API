import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

async function createUser(request, response) {
  try {
    const { name, password, role, dni, email } = request.body;

    if (await userModel.findOne({ email: email })) {
      return response
        .status(400)
        .send({ message: "An account with that email already exists" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const user = await userModel.create({
      name: name,
      password: encryptedPassword,
      role: role.toLowerCase(),
      dni: dni,
      email: email,
    });

    return response.status(200).send({ user });
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function registerStudent(request, response) {
  try {
    const { name, password, dni, email } = request.body;

    if (await userModel.findOne({ email: email })) {
      return response
        .status(400)
        .send({ message: "An account with that email already exists" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    await userModel.create({
      name: name,
      password: encryptedPassword,
      role: "student",
      dni: dni,
      email: email,
    });

    return response.status(200).send("Student registered successfully");
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function registerTeacher(request, response) {
  try {
    const { name, password, dni, email } = request.body;

    if (await userModel.findOne({ email: email })) {
      return response
        .status(400)
        .send({ message: "An account with that email already exists" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    await userModel.create({
      name: name,
      password: encryptedPassword,
      role: "teacher",
      dni: dni,
      email: email,
    });

    return response.status(200).send("Teacher registered successfully");
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function deleteUser(request, response) {
  try {
    const userId = request.body.id;

    await userModel.deleteOne({ _id: userId });

    return response.status(200).send({ message: "User deleted" });
  } catch (error) {
    response.status(500).send({ error });
  }
}

// En un futuro cambiara debido a que no se pidio implementar autentificacion.
async function changeUserPassword(request, response) {
  try {
    const userId = request.params.userId;

    if (userId !== request.id) {
      return response
        .status(404)
        .send({ message: "You can't change someone elses password." });
    }

    const newPassword = request.body.password;
    const user = await userModel.findById(userId);

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(newPassword, user.password);

    if (!isMatch) {
      const encryptedNewPassword = bcrypt.hashSync(newPassword, 10);
      user.password = encryptedNewPassword;
      await user.save();
      return response
        .status(200)
        .send({ message: "Password updated successfully" });
    }

    return response
      .status(401)
      .send({ message: "New password cannot be the same as the old password" });
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function changeUserEmail(request, response) {
  try {
    const userId = request.params.userId;

    if (userId !== request.id) {
      return response
        .status(404)
        .send({ message: "You can't change someone elses email." });
    }

    const newEmail = request.body.email;
    const user = await userModel.findById(userId);

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    if (user.email !== newEmail) {
      user.email = newEmail;
      await user.save();
      return response
        .status(200)
        .send({ message: "Email updated successfully" });
    }

    return response
      .status(401)
      .send({ message: "New email cannot be the same as the old email" });
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function getStudents(request, response) {
  try {
    const users = await userModel.find({ role: "student" });

    return response.send({ users });
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function getTeachers(request, response) {
  try {
    const users = await userModel.find({ role: "teacher" });

    return response.send({ users });
  } catch (error) {
    response.status(500).send({ error });
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

  return response.status(200).send({ token });
}

export {
  createUser,
  deleteUser,
  getStudents,
  getTeachers,
  changeUserPassword,
  changeUserEmail,
  login,
  registerStudent,
  registerTeacher,
};
