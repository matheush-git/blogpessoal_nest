import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty, Length } from "class-validator";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({ name: "tb_postagens" })
export class Postagem {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Length(5, 100)
  @Column({ length: 100, nullable: false })
  titulo: string;

  @IsNotEmpty()
  @Length(10, 1000)
  @Column({ length: 1000, nullable: false })
  texto: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  data: Date;

  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "tema_id" }) // 👈 importante para criar chave estrangeira
  tema: Tema;
}
