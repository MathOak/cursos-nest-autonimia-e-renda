/* eslint-disable @typescript-eslint/no-unsafe-call */
//src/produtos/dto/create-produto.dto.ts
import { IsNumber, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsString({ message: 'O nome do produto precisa ser um texto' })
  nome: string;

  @IsNumber()
  preco: number;

  @IsString({ message: 'A categoria do produto precisa ser um texto' })
  categoria: string;
}
