// produtos/produtos.services.ts
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProdutosService } from './produtos.service'; // Importa o serviço
import { CreateProdutoDto } from './dto/create-produto.dto';
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {} // Injeta o serviço

  @Get() // Mapeia para GET /produtos
  findAll(): { id: string; nome: string }[] {
    return this.produtosService.findAll(); // Delega a lógica ao serviço
  }

  @Get(':id') // Mapeia para GET /produtos/:id
  findOne(@Param('id') id: string): { id: string; nome: string } | undefined {
    return this.produtosService.findOne(id); // Delega a lógica ao serviço
  }
  @Get('filtrar')
  filterByCategory(@Query('categoria') categoria: string) {
    console.log(`Filtrando por: ${categoria}`);
    return this.produtosService.findAllByCategory(categoria);
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
}
