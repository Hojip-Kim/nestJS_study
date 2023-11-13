import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(
        @InjectRepository(Board)
        private readonly repository: Repository<Board>
    ){
        super(repository.target, repository.manager, repository.queryRunner);
    }
}