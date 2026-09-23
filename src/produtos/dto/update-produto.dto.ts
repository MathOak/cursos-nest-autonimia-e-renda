import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProdutoDto {
  @IsOptional()
  @IsString({ message: 'O nome do produto precisa ser um texto' })
  nome?: string;

  @IsOptional()
  @IsNumber()
  preco?: number;

  @IsOptional()
  @IsString({ message: 'A categoria do produto precisa ser um texto' })
  categoria?: string;

  @IsOptional()
  @IsString({ message: 'A imagem do produto precisa ser um texto' })
  imagem?: string;
}
