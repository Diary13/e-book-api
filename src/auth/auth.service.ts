import { Injectable, InternalServerErrorException, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, userDocument } from "src/users/entities/user.entity";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface TokenPayload {
    userId: string;
    username: string;
    image: string;
    email: string;
    isAdmin: boolean;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<userDocument>,
        private readonly jwtService: JwtService
    ) { }

    async login(auth: AuthDto): Promise<any> {
        try {
            const foundUser = await this.userModel.findOne({ email: auth.email });
            if (foundUser) {
                const match = await bcrypt.compare(auth.password, foundUser.password);
                if (match) {
                    const payload: TokenPayload = {
                        userId: foundUser._id.toString(),
                        username: foundUser.username,
                        email: foundUser.email,
                        image: foundUser.image,
                        isAdmin: foundUser.isAdmin
                    }
                    return this.jwtService.sign(payload);
                }
            }
            return new UnauthorizedException();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}