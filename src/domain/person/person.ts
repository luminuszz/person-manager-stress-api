import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

interface PersonProps {
  nome: string;
  cpfCnpj: string;
  nascimento: string;
  seguros: string[] | null;
}

export class Person extends Entity<PersonProps> {
  private constructor(props: PersonProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: PersonProps, id?: UniqueEntityID) {
    return new Person(props, id);
  }

  get nome(): string {
    return this.props.nome;
  }

  get cpfCnpj(): string {
    return this.props.cpfCnpj;
  }

  get nascimento(): string {
    return this.props.nascimento;
  }

  get seguros(): string[] | null {
    return this.props.seguros;
  }
}
