// produtos/produtos.services.ts
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import sharp from 'sharp';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get('filtrar')
  filterByCategory(@Query('categoria') categoria: string) {
    console.log(`Filtrando por: ${categoria}`);
    return this.produtosService.findAllByCategory(categoria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(id);
  }

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.createOne(createProdutoDto);
  }

  @Post(':id/imagem')
  @UseInterceptors(
    FileInterceptor('imagem', {
      limits: {
        fileSize: 5 * 1024 * 1024
      },
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadDir = join(process.cwd(), 'uploads', 'produtos');
          mkdirSync(uploadDir, { recursive: true });
          cb(null, uploadDir);
        },
        filename: (_req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
          const extension = extname(file.originalname);
          cb(null, `${uniqueName}${extension}`);
        }
      }),
      fileFilter: (_req, file, cb) => {
        const formatosAceitos = /image\/(jpg|jpeg|png|gif|webp)/;
        if (!formatosAceitos.test(file.mimetype)) {
          cb(new BadRequestException('Formato de imagem inválido'), false);
          return;
        }
        cb(null, true);
      }
    })
  )
  async uploadImagem(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      return;
    }

    const produtoExistente = this.produtosService.findOne(id);
    if (!produtoExistente) {
      return;
    }

    const uploadDir = join(process.cwd(), 'uploads', 'produtos');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const nomeArquivo = `${Date.now()}-${Math.random().toString(16).slice(2)}.webp`;
    const caminhoArquivo = join(uploadDir, nomeArquivo);

    try {
      await sharp(file.path)
        .resize(800, 800, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 80 })
        .toFile(caminhoArquivo);
    } catch {
      return;
    }

    const imagemUrl = `/uploads/produtos/${nomeArquivo}`;
    return this.produtosService.updateOnePartial(id, { imagem: imagemUrl });
  }

  @Post(':id/imagem-grande')
  @UseInterceptors(
    FileInterceptor('imagem', {
      limits: {
        fileSize: 20 * 1024 * 1024
      },
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadDir = join(process.cwd(), 'uploads', 'produtos');
          mkdirSync(uploadDir, { recursive: true });
          cb(null, uploadDir);
        },
        filename: (_req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
          const extension = extname(file.originalname);
          cb(null, `${uniqueName}${extension}`);
        }
      }),
      fileFilter: (_req, file, cb) => {
        const formatosAceitos = /image\/(jpg|jpeg|png|gif|webp)/;
        if (!formatosAceitos.test(file.mimetype)) {
          cb(new BadRequestException('Formato de imagem inválido'), false);
          return;
        }
        cb(null, true);
      }
    })
  )
  async uploadImagemGrande(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      return;
    }

    const produtoExistente = this.produtosService.findOne(id);
    if (!produtoExistente) {
      return;
    }

    const uploadDir = join(process.cwd(), 'uploads', 'produtos');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const nomeArquivo = `${Date.now()}-${Math.random().toString(16).slice(2)}.webp`;
    const caminhoArquivo = join(uploadDir, nomeArquivo);

    await sharp(file.path)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 75 })
      .toFile(caminhoArquivo);

    const imagemUrl = `/uploads/produtos/${nomeArquivo}`;
    return this.produtosService.updateOnePartial(id, { imagem: imagemUrl });
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
