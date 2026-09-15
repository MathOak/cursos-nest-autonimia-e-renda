import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosService } from './produtos.service';

describe('ProdutosService', () => {
  let service: ProdutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutosService]
    }).compile();

    service = module.get<ProdutosService>(ProdutosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deveria retornar todos os produtos', () => {
    expect(service.findAll()).toHaveLength(4);
    expect(service.findAll()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: '1', nome: 'notebook' }),
        expect.objectContaining({ id: '4', nome: 'cadeira' })
      ])
    );
  });

  it('deveria retornar um produto pelo id', () => {
    expect(service.findOne('2')).toEqual({
      id: '2',
      nome: 'mouse',
      preco: 150,
      categoria: 'eletronicos'
    });
  });

  it('deveria retornar undefined quando o id nao existir', () => {
    expect(service.findOne('999')).toBeUndefined();
  });

  it('deveria retornar produtos da categoria informada', () => {
    expect(service.findAllByCategory('moveis')).toEqual([
      {
        id: '4',
        nome: 'cadeira',
        preco: 250.55,
        categoria: 'moveis'
      }
    ]);
  });

  it('deveria retornar uma lista vazia para categoria inexistente', () => {
    expect(service.findAllByCategory('livros')).toEqual([]);
  });

  it('deveria criar e retornar um novo produto', () => {
    const produtoDto = {
      nome: 'monitor',
      preco: 1200,
      categoria: 'eletronicos'
    };

    expect(service.createOne(produtoDto)).toEqual({
      id: '5',
      ...produtoDto
    });
    expect(service.findAll()).toHaveLength(5);
  });
});
