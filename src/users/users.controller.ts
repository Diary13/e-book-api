import { Body, Controller, HttpException, HttpStatus, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserInput } from './dto/create-user.input';
import * as fs from 'fs';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Controller('users')
export class UsersController {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<userDocument>,
        private readonly usersService: UsersService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('image', { dest: './uploads/users' }))
    async create(@UploadedFile() image, @Body() createUserInput: CreateUserInput) {
        try {
            let data;
            if (!createUserInput.isAdmin) {
                if (image) {
                    data = { path: './uploads/users/' + Date.now() + '_' + image.originalname };
                    fs.renameSync('./uploads/users/' + image.filename, data.path);
                } else {
                    data = { path: './uploads/users/user.png' };
                }
            } else {
                if (image) {
                    data = { path: './uploads/users/' + Date.now() + '_' + image.originalname };
                    fs.renameSync('./uploads/users/' + image.filename, data.path);
                } else
                    data = { path: './uploads/users/admin.png' };
            }
            const result = await this.usersService.create({ ...createUserInput, image: data.path });
            if (result.statusCode == HttpStatus.UNAUTHORIZED) {
                if (image)
                    fs.unlinkSync(data.path);
            }
            return result;
        } catch (error) {
            throw new HttpException("Could not save user", HttpStatus.UNAUTHORIZED);
        }
    }

    @Patch('update')
    @UseInterceptors(FileInterceptor('image', { dest: './uploads/users' }))
    async update(@UploadedFile() image, @Body() updateUserInput: UpdateUserInput) {
        try {
            const foundUser = await this.userModel.findById(updateUserInput.id);
            if (foundUser) {
                if (image) {
                    fs.unlinkSync(foundUser.image);
                    const data = { path: './uploads/users/' + Date.now() + '_' + image.originalname };
                    fs.renameSync('./uploads/users/' + image.filename, data.path);
                    updateUserInput.image = data.path;
                }
                return this.usersService.update(updateUserInput);
            }
        } catch (error) {
            throw new HttpException("Cannot update user", HttpStatus.UNAUTHORIZED);
        }
    }
}
