# Extração de Dados Nutricionais com IA

Este projeto é uma aplicação web desenvolvida para extrair informações nutricionais detalhadas a partir de imagens de rótulos de alimentos ou tabelas nutricionais. Utiliza um backend robusto construído com Node.js e Express, que gerencia o processamento das imagens enviadas pelos usuários. A extração dos dados é realizada através da integração com a API de inteligência artificial DeepSeek, que analisa as imagens e retorna as informações nutricionais contidas nelas.

## Funcionalidades

*   Upload de imagens de tabelas nutricionais.
*   Processamento de imagens no servidor (redimensionamento e compressão).
*   Extração de dados nutricionais utilizando a API DeepSeek.

## Fase Atual do Projeto

O backend da aplicação está atualmente em uma fase de desenvolvimento funcional, capaz de:
*   Receber uploads de imagens.
*   Processar as imagens (redimensionar e comprimir para otimizar a análise).
*   Integrar-se com a API DeepSeek para extrair dados nutricionais em formato de texto bruto.

**Próximos Passos Potenciais:**
*   Implementação de um parser para converter o texto bruto extraído pela IA em um formato de dados estruturado (JSON, por exemplo), facilitando a utilização e visualização dos dados.
*   Desenvolvimento ou integração de uma interface de usuário (client-side) para facilitar o upload das imagens e a visualização dos resultados. Atualmente, o foco tem sido na funcionalidade do backend e na API.
*   Refinamento contínuo do prompt enviado à API de IA para melhorar a precisão e o detalhamento dos dados extraídos.

O projeto pode ser considerado em estágio de **desenvolvimento ativo / prova de conceito**, com a fundação do backend estabelecida e a principal funcionalidade de extração de dados via IA implementada.

## Tecnologias Utilizadas

*   **Backend:** Node.js, Express.js
*   **Processamento de Imagem:** Sharp
*   **Chamadas API (AI):** Axios
*   **Inteligência Artificial:** DeepSeek API (especificamente o modelo `deepseek-reasoner`)
*   **Variáveis de Ambiente:** dotenv

## Como Clonar a Aplicação

Siga os passos abaixo para clonar o repositório da aplicação.

### 1. Clonar o Repositório

Primeiro, clone o repositório para a sua máquina local utilizando o seguinte comando no terminal:
```bash
git clone <URL_DO_REPOSITORIO>
```
Substitua `<URL_DO_REPOSITORIO>` pela URL fornecida do repositório.

Após a clonagem, navegue até a pasta do projeto:
```bash
cd <NOME_DA_PASTA_DO_PROJETO>
```
Substitua `<NOME_DA_PASTA_DO_PROJETO>` pelo nome da pasta que foi criada durante a clonagem.

## Configurando e Executando o Backend (Servidor)

O backend é responsável por processar as imagens e interagir com a API de IA. Para executar o servidor localmente, siga estes passos:

1.  **Clone o repositório** (se ainda não o fez):
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

2.  **Navegue até a pasta do servidor**:
    ```bash
    cd server
    ```

3.  **Instale as dependências**:
    Certifique-se de ter o Node.js e o npm instalados.
    ```bash
    npm install
    ```
    Este comando instalará todas as dependências listadas no arquivo package.json do servidor, como Express, Sharp, Axios, etc.

4.  **Configure as variáveis de ambiente**:
    *   Crie um arquivo `.env` dentro da pasta `server`.
    *   Adicione as seguintes variáveis ao arquivo `.env`:
        ```
        DEEPSEEK_API_URL=SUA_URL_DA_API_DEEPSEEK
        DEEPSEEK_API_KEY=SUA_CHAVE_DA_API_DEEPSEEK
        PORT=5555 # Porta opcional, o padrão é 5555 se não especificado
        ```
    *   Substitua `SUA_URL_DA_API_DEEPSEEK` e `SUA_CHAVE_DA_API_DEEPSEEK` com suas credenciais reais da API DeepSeek.

5.  **Inicie o servidor**:
    ```bash
    node index.js
    ```

6.  O servidor estará rodando em `http://localhost:PORT` (por exemplo, `http://localhost:5555` se a porta não for alterada).
    Você pode verificar o status do servidor acessando a rota de saúde: `http://localhost:PORT/api/health`.

## Configurando e Executando o Frontend (Cliente)

O frontend é a interface com a qual o usuário interage para enviar imagens e ver os resultados.

1.  **Navegue até a pasta do cliente**:
    A partir da raiz do projeto (certifique-se de voltar para a raiz do projeto se você ainda estiver no diretório `server`, usando `cd ..`), entre no diretório `client`:
    ```bash
    cd client
    ```

2.  **Instale as dependências do cliente**:
    Este comando instalará todas as dependências do frontend, como React e outras bibliotecas necessárias, listadas no `package.json` do cliente.
    ```bash
    npm install
    ```

3.  **Inicie a aplicação de desenvolvimento do cliente**:
    Após a instalação das dependências, inicie o servidor de desenvolvimento do React:
    ```bash
    npm start
    ```

4.  Este comando iniciará o servidor de desenvolvimento do React. Geralmente, a aplicação abrirá automaticamente em seu navegador padrão no endereço `http://localhost:3000`. Se não abrir automaticamente, você pode acessá-la manualmente digitando `http://localhost:3000` na barra de endereços do seu navegador. O frontend se comunicará com o backend (que deve estar em execução conforme anteriormente explicado) para enviar imagens e receber dados.

