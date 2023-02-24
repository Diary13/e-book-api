import { Body, Controller, InternalServerErrorException, NotAcceptableException, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() authDto: AuthDto) {
        try {
            return this.authService.login(authDto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}