import { BaseEntity } from 'typeorm';
import { BoardStatus } from './board-status.enum';
export declare class Board extends BaseEntity {
    id: number;
    title: string;
    description: string;
    status: BoardStatus;
}
