import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Cant find Board with id ${id}`);
        }

        console.log('result', result);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({username});

        if(user && (await bcrypt.compare(password, user.password))){
            //유저 토큰 생성 (Secret + Payload)
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken: accessToken};
        }else {
            throw new UnauthorizedException('Login failed')
        }
    }

}
