/* eslint-disable prettier/prettier */
// produtos/produtos.services.ts
import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable() // Indica que esta classe é um provedor que pode ser injetado
export class ProdutosService {
  private readonly produtos: {
    id: string;
    nome: string;
    categoria: string;
    preco: number;
  }[] = [];

  constructor() {
    this.produtos.push({
      id: '1',
      nome: 'notebook',
      preco: 3500,
      categoria: 'eletronicos'
    });
    this.produtos.push({
      id: '2',
      nome: 'mouse',
      preco: 150,
      categoria: 'eletronicos'
    });
    this.produtos.push({
      id: '3',
      nome: 'teclado',
      preco: 250.55,
      categoria: 'eletronicos'
    });
    this.produtos.push({
      id: '4',
      nome: 'cadeira',
      preco: 250.55,
      categoria: 'moveis'
    });
  }

  findAll(): { id: string; nome: string }[] {
    return this.produtos;
  }

  findOne(id: string): { id: string; nome: string } | undefined {
    return this.produtos.find((produto) => produto.id === id);
  }
  findAllByCategory(categoria: string) {
    return this.produtos.filter((produto) => produto.categoria === categoria);
  }

  createOne(createProdutoDTO: CreateProdutoDto): {
    id: string;
    nome: string;
    categoria: string;
    preco: number;
  } {
    const newId = (this.produtos.length + 1).toString();
    const newProduto = { id: newId, ...createProdutoDTO };
    this.produtos.push(newProduto);
    return newProduto;
  }
}
