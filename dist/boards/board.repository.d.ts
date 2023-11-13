import { Repository } from 'typeorm';
import { Board } from './board.entity';
export declare class BoardRepository extends Repository<Board> {
    private readonly repository;
    constructor(repository: Repository<Board>);
}
