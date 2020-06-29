/* Toda vez que formos fazer um agendamento iremos utilizar esse arquivo */
import { uuid } from 'uuidv4';

/* Declarando o modelo de dados */
class Appointment {
  id: string;

  provider: string;

  date: Date;

  /* O constructor é criado para passar parâmetros quando chamarmos a classe em outros arquivos, deverá ser passado o provider e a date. Appointment(provider,date) */
  // Para colocarmos em prática o conceito de DTO, geralmente criamos uma interface passando os tipos dos objetos, porém o TypeScript tem essa ferramenta que passa o objeto aproveitando o modelo que já foi passado antes do constructor, não cenecessitando de uma interface. Então passamos a função Omit, que recebe dois parâmetros, o tipo e o parâmetro que queremos omitir deste tipo, no caso omitimos o id que já recebe o valor de uuid.
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
