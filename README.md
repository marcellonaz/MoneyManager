# Money Manager

![Logo Money Manager](./src/assets/images/IconMoneyManager.png)

## Descrição

Money Manager é uma aplicação de gerenciamento financeiro que permite aos usuários acompanhar suas entradas e saídas, proporcionando uma visão clara de suas finanças. Através de uma interface intuitiva e fácil de usar, os usuários podem registrar transações, visualizar totais mensais e manter o controle de seus gastos.

## Funcionalidades

- **CRUD de Transações**: Adicione, edite e exclua transações financeiras.
- **Visualização de Totais**: Veja rapidamente o total de entradas e saídas.
- **Navegação Mensal**: Altere entre meses para visualizar transações passadas.
- **Design Responsivo**: A interface é otimizada para dispositivos móveis e desktop.

## Tecnologias Utilizadas

- Angular
- Angular Material
- JSON Server para simulação de backend

## Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/marcellonaz/MoneyManager.git
   cd MoneyManager
   ```
2. **Instale as dependências:**
  ```bash
npm install
```
3. **Inicie o servidor JSON para simulação do backend:**

 ```bash
json-server --watch db/db.json
```
4. **Inicie a aplicação Angular:**

 ```bash
ng serve
```
5. **Acesse a aplicação:**

Abra o navegador e acesse http://localhost:4200.

## Testes Unitários
Os testes unitários para o CurrencyService são realizados usando o HttpClientTestingModule. Para executar os testes, utilize o seguinte comando:

```bash
ng test
```

## Estrutura do Projeto

**src/:** Código-fonte da aplicação.
**db/:** Contém o arquivo db.json, que simula o banco de dados.
**src/assets/images/:** Pasta para armazenar imagens, como o logo.
Contribuições
Contribuições são bem-vindas! Se você tiver sugestões ou melhorias, sinta-se à vontade para abrir um pull request.

