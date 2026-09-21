// produtos/produtos.services.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ProdutosService } from './produtos.service'; // Importa o serviço
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {} // Injeta o serviço

  @Get() // Mapeia para GET /produtos
  findAll(): { id: string; nome: string }[] {
    return this.produtosService.findAll(); // Delega a lógica ao serviço
  }

  @Get('filtrar')
  filterByCategory(@Query('categoria') categoria: string) {
    console.log(`Filtrando por: ${categoria}`);
    return this.produtosService.findAllByCategory(categoria);
  }
  @Get(':id') // Mapeia para GET /produtos/:id
  findOne(@Param('id') id: string): { id: string; nome: string } | undefined {
    return this.produtosService.findOne(id); // Delega a lógica ao serviço
  }
  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto): {
    id: string;
    nome: string;
    categoria: string;
    preco: number;
  } {
    return this.produtosService.createOne(createProdutoDto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProdutoDto) {
    return this.produtosService.updateOne(id, dto);
  }
  @Patch(':id')
  updatePartial(
    @Param('id') id: string,
    @Body() dto: Partial<UpdateProdutoDto>
  ) {
    return this.produtosService.updateOnePartial(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.produtosService.remove(id);
  }
}
