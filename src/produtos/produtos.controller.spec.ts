import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';

describe('ProdutosController', () => {
  let controller: ProdutosController;
  let service: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    findAllByCategory: jest.Mock;
    createOne: jest.Mock;
    updateOne: jest.Mock;
    updateOnePartial: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      findAllByCategory: jest.fn(),
      createOne: jest.fn(),
      updateOne: jest.fn(),
      updateOnePartial: jest.fn(),
      remove: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [{ provide: ProdutosService, useValue: service }]
    }).compile();

    controller = module.get<ProdutosController>(ProdutosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deveria buscar todos os produtos', () => {
    const produtos = [{ id: '1', nome: 'notebook' }];
    service.findAll.mockReturnValue(produtos);

    expect(controller.findAll()).toBe(produtos);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('deveria buscar um produto pelo id', () => {
    const produto = { id: '1', nome: 'notebook' };
    service.findOne.mockReturnValue(produto);

    expect(controller.findOne('1')).toBe(produto);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('deveria filtrar produtos por categoria', () => {
    const produtos = [{ id: '1', nome: 'notebook' }];
    service.findAllByCategory.mockReturnValue(produtos);

    expect(controller.filterByCategory('eletronicos')).toBe(produtos);
    expect(service.findAllByCategory).toHaveBeenCalledWith('eletronicos');
  });

  it('deveria criar um produto', () => {
    const produtoDto = {
      nome: 'monitor',
      preco: 1200,
      categoria: 'eletronicos'
    };
    const produtoCriado = { id: '5', ...produtoDto };
    service.createOne.mockReturnValue(produtoCriado);

    expect(controller.create(produtoDto)).toBe(produtoCriado);
    expect(service.createOne).toHaveBeenCalledWith(produtoDto);
  });

  it('deveria atualizar um produto completamente', () => {
    const produtoDto = {
      nome: 'monitor ultrawide',
      preco: 1800,
      categoria: 'eletronicos'
    };
    const produtoAtualizado = { id: '1', ...produtoDto };
    service.updateOne.mockReturnValue(produtoAtualizado);

    expect(controller.update('1', produtoDto)).toBe(produtoAtualizado);
    expect(service.updateOne).toHaveBeenCalledWith('1', produtoDto);
  });

  it('deveria atualizar parcialmente um produto', () => {
    const produtoDto = { preco: 1750 };
    const produtoAtualizado = {
      id: '1',
      nome: 'notebook',
      preco: 1750,
      categoria: 'eletronicos'
    };
    service.updateOnePartial.mockReturnValue(produtoAtualizado);

    expect(controller.updatePartial('1', produtoDto)).toBe(produtoAtualizado);
    expect(service.updateOnePartial).toHaveBeenCalledWith('1', produtoDto);
  });

  it('deveria remover um produto', () => {
    controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
