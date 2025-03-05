import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Crud {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
}