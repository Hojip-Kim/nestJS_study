import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
export declare class BoardsController {
    private boardsService;
    constructor(boardsService: BoardsService);
    createBoard(CreateBoardDto: CreateBoardDto): Promise<Board>;
    getBoardById(id: number): Promise<Board>;
}
