import { Body, Controller, Delete, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}

        @Post('/signup')
        signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<User> {
            return this.authService.signUp(authcredentialsDto);
        }

        @Delete('/:id')
        deleteUser(@Param('id', ParseIntPipe) id:number): Promise<void> {
        return this.authService.deleteUser(id);
        }
        @Post('/signin')
        signIn(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
            return this.authService.signIn(authcredentialsDto);
        }

        @Post('/test')
        @UseGuards(AuthGuard())
        test(@GetUser() user: User){
            console.log('user', user);
        }
    
}
