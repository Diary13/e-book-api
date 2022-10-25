import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpResponse } from 'src/types/httpResponse';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, userDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

@Injectable()
export class UsersService {

	constructor(@InjectModel(User.name) private readonly userModel: Model<userDocument>) { }
	async create(createUserInput: CreateUserInput): Promise<any> {
		try {
			const foundUser = await this.userModel.findOne({ email: createUserInput.email });
			if (!foundUser) {
				createUserInput.password = bcrypt.hashSync(createUserInput.password, 5);
				const newUser = await new this.userModel(createUserInput).save();
				const result = JSON.parse(JSON.stringify(newUser));
				return { ...result, statusCode: HttpStatus.OK };
			}
			return {
				statusCode: HttpStatus.UNAUTHORIZED,
				message: 'User already exist'
			}
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async update(updateUserInput: UpdateUserInput): Promise<User> {
		try {
			if (updateUserInput.password)
				updateUserInput.password = bcrypt.hashSync(updateUserInput.password, 5);
			const userUpdated = await this.userModel.findOneAndUpdate({ _id: updateUserInput.id }, {
				username: updateUserInput.username,
				password: updateUserInput.password,
				email: updateUserInput.email,
				image: updateUserInput.image,
				isAdmin: updateUserInput.isAdmin,
				tel: updateUserInput.tel
			}, { new: true });
			return userUpdated;
		} catch (error) {
			throw new NotFoundException();
		}
	}

	async findAll(): Promise<User[]> {
		try {
			return await this.userModel.find();
		} catch (error) {
			throw new InternalServerErrorException();
		}

	}

	async findOneById(id: string): Promise<User> {
		try {
			return await this.userModel.findById(id);
		} catch (error) {
			throw new NotFoundException();
		}
	}

	async remove(id: string): Promise<HttpResponse> {
		try {
			const foundUser = await this.userModel.findById(id);
			if (foundUser) {
				fs.unlinkSync(foundUser.image);
				const deleted = await this.userModel.deleteOne({ _id: id });
				if (deleted)
					return {
						statusCode: HttpStatus.OK,
						message: "user deleted successfully"
					}
			}
		}
		catch (error) {
			throw new NotFoundException();
		}
	}
}
