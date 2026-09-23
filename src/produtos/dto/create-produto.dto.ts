import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsString({ message: 'O nome do produto precisa ser um texto' })
  nome: string;

  @IsNumber()
  preco: number;

  @IsString({ message: 'A categoria do produto precisa ser um texto' })
  categoria: string;

  @IsOptional()
  @IsString({ message: 'A imagem do produto precisa ser um texto' })
  imagem?: string;
}
