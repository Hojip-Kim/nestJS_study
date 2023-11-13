import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}
    // private boards: Board[] = [];


    // getAllBoards(): Board[]{
    //     return this.boards;
    // }
    async getAllBoard(user : User): Promise <Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id});

        const boards = await query.getMany();
        return boards;
    }

    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOneBy({id});

        if(!found) {
            throw new NotFoundException(`Cant find Board with id ${id}`);
        }
        return found;
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find(board => board.id === id);
        
    //     if(!found){
    //         throw new NotFoundException(`Cant find Board with id ${id}`);
    //     }

    //     return found;
    // }

    createBoard(CreateBoardDto: CreateBoardDto, user: User): Promise <Board> {
        return this.boardRepository.createBoard(CreateBoardDto, user);
    }

    async deleteBoard(id: number, user: User): Promise<void> {

        const result = await this.boardRepository.createQueryBuilder().delete().from(Board).where("id = :id", {id: id}).andWhere("userId = :userId", {userId: user.id}).execute();

        if(result.affected === 0){
            throw new NotFoundException(`Cant find Board with id ${id}`);
        }

        console.log('result', result);
    }

    // createBoard(CreateBoardDto:CreateBoardDto) {
    //     const {title, description} = CreateBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     };
    //     this.boards.push(board);
    //     return board;
    // }

    // deleteBoard(id: string): Board {
    //     const found = this.getBoardById(id);

    //     this.boards = this.boards.filter(board => board.id !== id); // 같은건 삭제하고 같지않은건 남김.

    //     return found;

    // }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
