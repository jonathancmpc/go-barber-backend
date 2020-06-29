/* Toda vez que formos fazer um agendamento iremos utilizar esse arquivo */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/* Declarando o modelo de dados com decorators */
@Entity('appointments') // Nome da nossa tabela
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
