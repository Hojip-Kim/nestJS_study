import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

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

    async createBoard(CreateBoardDto: CreateBoardDto): Promise <Board> {
        const {title, description} = CreateBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });

        await this.boardRepository.save(board);
        return board;
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

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
