import { IsNumber, IsString } from 'class-validator';

export class UpdateProdutoDto {
  @IsString({ message: 'O nome do produto precisa ser um texto' })
  nome: string;

  @IsNumber()
  preco: number;

  @IsString({ message: 'A categoria do produto precisa ser um texto' })
  categoria: string;
}
