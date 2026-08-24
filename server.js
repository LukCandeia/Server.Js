const express = require ('express')
const app = express ()

const produtos = [
  {
    "id": 1,
    "descricao": "Teclado Mecânico RGB",
    "preco": 249.90,
    "categoria": "Periféricos",
    "estoque": 15
  },
  {
    "id": 2,
    "descricao": "Mouse Gamer sem Fio",
    "preco": 129.50,
    "categoria": "Periféricos",
    "estoque": 30
  },
  {
    "id": 3,
    "descricao": "Monitor UltraWide 29 polegadas",
    "preco": 1399.00,
    "categoria": "Monitores",
    "estoque": 8
  },
  {
    "id": 4,
    "descricao": "Cadeira Ergonômica de Escritório",
    "preco": 850.00,
    "categoria": "Mobiliário",
    "estoque": 5
  },
  {
    "id": 5,
    "descricao": "Headset Gamer Surround 7.1",
    "preco": 299.99,
    "categoria": "Áudio",
    "estoque": 22
  },
  {
    "id": 6,
    "descricao": "Notebook Gamer 16GB RAM",
    "preco": 4899.00,
    "categoria": "Computadores",
    "estoque": 4
  },
  {
    "id": 7,
    "descricao": "SSD NVMe M.2 1TB",
    "preco": 450.00,
    "categoria": "Armazenamento",
    "estoque": 40
  },
  {
    "id": 8,
    "descricao": "Placa de Vídeo RTX 4060",
    "preco": 2199.90,
    "categoria": "Hardware",
    "estoque": 10
  },
  {
    "id": 9,
    "descricao": "Processador Ryzen 7 5700X",
    "preco": 1150.00,
    "categoria": "Hardware",
    "estoque": 12
  },
  {
    "id": 10,
    "descricao": "Memória RAM 16GB DDR4",
    "preco": 280.00,
    "categoria": "Hardware",
    "estoque": 35
  },
  {
    "id": 11,
    "descricao": "Webcam Full HD 1080p",
    "preco": 199.90,
    "categoria": "Periféricos",
    "estoque": 18
  },
  {
    "id": 12,
    "descricao": "Caixa de Som Bluetooth",
    "preco": 159.00,
    "categoria": "Áudio",
    "estoque": 25
  },
  {
    "id": 13,
    "descricao": "Roteador Wi-Fi 6 Gigabit",
    "preco": 420.00,
    "categoria": "Redes",
    "estoque": 14
  },
  {
    "id": 14,
    "descricao": "Impressora Multifuncional Tank",
    "preco": 980.00,
    "categoria": "Impressão",
    "estoque": 7
  },
  {
    "id": 15,
    "descricao": "Tablet 10.4 polegadas 64GB",
    "preco": 1299.00,
    "categoria": "Tablets",
    "estoque": 9
  },
  {
    "id": 16,
    "descricao": "Smartphone 128GB Câmera Dupla",
    "preco": 1899.00,
    "categoria": "Smartphones",
    "estoque": 11
  },
  {
    "id": 17,
    "descricao": "Suporte Articulado para Monitor",
    "preco": 189.90,
    "categoria": "Acessórios",
    "estoque": 20
  },
  {
    "id": 18,
    "descricao": "Hub USB-C 7 em 1",
    "preco": 149.50,
    "categoria": "Acessórios",
    "estoque": 28
  },
  {
    "id": 19,
    "descricao": "Mousepad Grande Speed",
    "preco": 69.90,
    "categoria": "Periféricos",
    "estoque": 50
  },
  {
    "id": 20,
    "descricao": "Microfone Condensador USB",
    "preco": 349.00,
    "categoria": "Áudio",
    "estoque": 16
  }
]

app.get('/', (req, res) => {
  res.send (`Olá Romell.`)
})

app.use(express.json())

//get produtos
app.get('/produtos', (req, res) => {
  res.json(produtos)
})

//get produtos/id
app.get('/produtos/:id', (req, res) => {
  const id = parseInt (req.params.id)
  
  const index = produtos.findIndex (prod => prod.id === id)
    if (index >= 0) {
        res.json(produtos[index])
    } else {
        res.status(404).send ('Deu ruim -- Produto não existe')
    }
})

//post produtos
app.post('/produtos', (req, res) => {
  const { id, descricao, preco, categoria, estoque  } = req.body;

  if(!id || !descricao || !preco|| !categoria|| !estoque) {
    return res.status(400).json('Error: Preencha os dados de forma adequada')
  }
  const novoProduto = {id, descricao, preco, categoria, estoque};
  produtos.push(novoProduto);
  return res.status(201).json('Criado com sucesso!')
}) 

//put
app.put('/produtos/:id', (req, res) => {
 const {id, descricao, preco, categoria, estoque} = req.body;

 if(!id || !descricao || preco == undefined || !categoria || !estoque) {
    return res.status(400).json('Error: Preencha os dados de forma correta');
 }
 const novoProduto = { id: parseInt(id), descricao, preco: parseFloat(preco), categoria, estoque: parseInt(estoque)};
 return res.status('Alterado com sucesso!')
})

app.delete('/produtos/:id', (req, res) => {
  const id = parseInt (req.params.id)
  
  const index = produtos.findIndex (prod => prod.id === id)
    if (index >= 0) {
        produtos.splice(index, 1)
    } else {
        res.status(404).send ('Não foi deletado -- Produto não existe')
    }
})

const port = 3000
app.listen (port, ()=>{
    console.log (`Server rodando no http://localhost:${port}`)
})