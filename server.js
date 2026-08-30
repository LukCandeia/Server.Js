const express = require("express");
const app = express();

app.use(express.json());

const produtos = [
  {
    id: 1,
    descricao: "Teclado Mecânico RGB",
    preco: 249.9,
    categoria: "Periféricos",
    estoque: 15,
  },
  {
    id: 2,
    descricao: "Mouse Gamer sem Fio",
    preco: 129.5,
    categoria: "Periféricos",
    estoque: 30,
  },
  {
    id: 3,
    descricao: "Monitor UltraWide 29 polegadas",
    preco: 1399.0,
    categoria: "Monitores",
    estoque: 8,
  },
  {
    id: 4,
    descricao: "Cadeira Ergonômica de Escritório",
    preco: 850.0,
    categoria: "Mobiliário",
    estoque: 5,
  },
  {
    id: 5,
    descricao: "Headset Gamer Surround 7.1",
    preco: 299.99,
    categoria: "Áudio",
    estoque: 22,
  },
  {
    id: 6,
    descricao: "Notebook Gamer 16GB RAM",
    preco: 4899.0,
    categoria: "Computadores",
    estoque: 4,
  },
  {
    id: 7,
    descricao: "SSD NVMe M.2 1TB",
    preco: 450.0,
    categoria: "Armazenamento",
    estoque: 40,
  },
  {
    id: 8,
    descricao: "Placa de Vídeo RTX 4060",
    preco: 2199.9,
    categoria: "Hardware",
    estoque: 10,
  },
  {
    id: 9,
    descricao: "Processador Ryzen 7 5700X",
    preco: 1150.0,
    categoria: "Hardware",
    estoque: 12,
  },
  {
    id: 10,
    descricao: "Memória RAM 16GB DDR4",
    preco: 280.0,
    categoria: "Hardware",
    estoque: 35,
  },
  {
    id: 11,
    descricao: "Webcam Full HD 1080p",
    preco: 199.9,
    categoria: "Periféricos",
    estoque: 18,
  },
  {
    id: 12,
    descricao: "Caixa de Som Bluetooth",
    preco: 159.0,
    categoria: "Áudio",
    estoque: 25,
  },
  {
    id: 13,
    descricao: "Roteador Wi-Fi 6 Gigabit",
    preco: 420.0,
    categoria: "Redes",
    estoque: 14,
  },
  {
    id: 14,
    descricao: "Impressora Multifuncional Tank",
    preco: 980.0,
    categoria: "Impressão",
    estoque: 7,
  },
  {
    id: 15,
    descricao: "Tablet 10.4 polegadas 64GB",
    preco: 1299.0,
    categoria: "Tablets",
    estoque: 9,
  },
  {
    id: 16,
    descricao: "Smartphone 128GB Câmera Dupla",
    preco: 1899.0,
    categoria: "Smartphones",
    estoque: 11,
  },
  {
    id: 17,
    descricao: "Suporte Articulado para Monitor",
    preco: 189.9,
    categoria: "Acessórios",
    estoque: 20,
  },
  {
    id: 18,
    descricao: "Hub USB-C 7 em 1",
    preco: 149.5,
    categoria: "Acessórios",
    estoque: 28,
  },
  {
    id: 19,
    descricao: "Mousepad Grande Speed",
    preco: 69.9,
    categoria: "Periféricos",
    estoque: 50,
  },
  {
    id: 20,
    descricao: "Microfone Condensador USB",
    preco: 349.0,
    categoria: "Áudio",
    estoque: 16,
  },
];

app.get("/", (req, res) => {
  res.send("API de Produtos no ar. Use /produtos para consultar o catálogo.");
});

// GET /produtos - lista todos os produtos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// GET /produtos/:id - consulta um produto específico
app.get("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const produto = produtos.find((prod) => prod.id === id);
  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).json({ erro: "Produto não encontrado" });
  }
});

// POST /produtos - cadastra um novo produto
app.post("/produtos", (req, res) => {
  const { id, descricao, preco, categoria, estoque } = req.body;

  if (
    id === undefined ||
    !descricao ||
    preco === undefined ||
    !categoria ||
    estoque === undefined
  ) {
    return res
      .status(400)
      .json({ erro: "Preencha os dados de forma adequada" });
  }

  const idNumerico = parseInt(id);
  const jaExiste = produtos.some((prod) => prod.id === idNumerico);
  if (jaExiste) {
    return res.status(400).json({ erro: "Já existe um produto com esse id" });
  }

  const novoProduto = {
    id: idNumerico,
    descricao,
    preco: parseFloat(preco),
    categoria,
    estoque: parseInt(estoque),
  };
  produtos.push(novoProduto);
  return res.status(201).json(novoProduto);
});

// PUT /produtos/:id - altera um produto existente
app.put("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { descricao, preco, categoria, estoque } = req.body;

  const index = produtos.findIndex((prod) => prod.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  if (
    !descricao ||
    preco === undefined ||
    !categoria ||
    estoque === undefined
  ) {
    return res.status(400).json({ erro: "Preencha os dados de forma correta" });
  }

  const produtoAtualizado = {
    id,
    descricao,
    preco: parseFloat(preco),
    categoria,
    estoque: parseInt(estoque),
  };
  produtos[index] = produtoAtualizado;

  return res.status(200).json(produtoAtualizado);
});

// DELETE /produtos/:id - exclui um produto existente
app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = produtos.findIndex((prod) => prod.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  produtos.splice(index, 1);
  return res.status(200).json({ mensagem: "Produto excluído com sucesso" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
