import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(
        @InjectRepository(Board)
        private readonly repository: Repository<Board>
    ){
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        });

        await this.save(board);
        return board;
    }

    async deleteBoard(id: number): Promise<void> {
        await this.delete(id);
    }

}