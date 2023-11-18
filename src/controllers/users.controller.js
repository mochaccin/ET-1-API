import userModel from '../models/user.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

async function createUser(request, response) {
  try {

    const body = request.body;
    const password = body.password;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const user = await userModel.create({
      name: body.name,
      password: encryptedPassword,
      role: body.role.toLowerCase(),
      dni: body.dni,
      email: body.email,
    });

    return response.status(200).send({ user });

  } catch (error) {
    response.status(500).send({ error });
  }
}

async function deleteUser(request, response) {

  try {
    
    const userId = request.body.id;

    await userModel.deleteOne({ _id: userId })
  
    return response.status(200).send({ message: 'User deleted' });

  } catch (error) {
    response.status(500).send({ error });
  }
}

// En un futuro cambiara debido a que no se pidio implementar autentificacion.
async function changeUserPassword(request, response) {

  try {
    const userId = request.params.userId;
    const newPassword = request.body.password;
    const user = await userModel.findById(userId);

    if (!user) {
      return response.status(404).send({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(newPassword, user.password);
  
    if (!isMatch) {
      const encryptedNewPassword = bcrypt.hashSync(newPassword, 10);
      user.password = encryptedNewPassword;
      await user.save();
      return response.status(200).send({ message: 'Password updated successfully' });
    }
  
    return response.status(401).send({ message: 'New password cannot be the same as the old password' });

  } catch (error) {
    response.status(500).send({ error });
  }

}

// En un futuro cambiara debido a que no se pidio implementar autentificacion.
async function changeUserEmail(request, response) {

  try {
    const userId = request.params.userId;
    const newEmail = request.body.email;
    const user = await userModel.findById(userId);

    if (!user) {
      return response.status(404).send({ message: 'User not found' });
    };
  
    if (user.email !== newEmail) {
      user.email = newEmail;
      await user.save();
      return response.status(200).send({ message: 'Email updated successfully' });
    }
  
    return response.status(401).send({ message: 'New email cannot be the same as the old email' });

  } catch (error) {
    response.status(500).send({ error });
  }

}

async function getStudents(request, response) {

  try {
    const users = await userModel.find({role: 'student'});

    return response.send({ users });

  } catch (error) {
    response.status(500).send({ error });
  }
}

async function getTeachers(request, response) {

  try {
    const users = await userModel.find({role: 'teacher'});

    return response.send({ users });

  } catch (error) {
    response.status(500).send({ error });
  }
}

export { createUser, deleteUser, getStudents, getTeachers, changeUserPassword, changeUserEmail };