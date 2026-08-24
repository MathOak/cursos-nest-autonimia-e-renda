// produtos/produtos.services.ts
import { Injectable } from '@nestjs/common';

@Injectable() // Indica que esta classe é um provedor que pode ser injetado
export class ProdutosService {
  private readonly produtos: {
    id: string;
    nome: string;
    preco: number;
  }[] = [];

  constructor() {
    this.produtos.push({ id: '1', nome: 'notebook', preco: 3500 });
    this.produtos.push({ id: '2', nome: 'mouse', preco: 150 });
    this.produtos.push({ id: '3', nome: 'teclado', preco: 250.55 });
  }

  findAll(): { id: string; nome: string }[] {
    return this.produtos;
  }

  findOne(id: string): { id: string; nome: string } | undefined {
    return this.produtos.find((produto) => produto.id === id);
  }
}
