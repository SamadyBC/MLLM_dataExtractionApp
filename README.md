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

## Desenvolvimento

Este projeto foi desenvolvido como uma aplicação web para extrair informações nutricionais de rótulos de alimentos ou tabelas nutricionais usando IA. O processo de desenvolvimento focou na criação de um backend robusto para lidar com o processamento de imagens e integração com IA, e um frontend amigável para upload de imagens e exibição dos resultados.

A aplicação segue uma arquitetura cliente-servidor:

*   **Backend:** Desenvolvido com Node.js e Express.js, o backend é responsável por receber uploads de imagens, processá-las (redimensionando e comprimindo usando a biblioteca Sharp), e interagir com a API de IA DeepSeek (usando Axios para chamadas à API) para extrair dados nutricionais. As variáveis de ambiente são gerenciadas com `dotenv`.
*   **Frontend:** Construído com React (inicializado com Create React App), o frontend fornece uma interface para os usuários fazerem upload de imagens e visualizarem as informações nutricionais extraídas. Componentes chave incluem `App.js` para a estrutura principal da aplicação e `ImageUploader.js` para lidar com uploads de imagens e exibição de resultados.

O projeto está atualmente em estágio de desenvolvimento ativo/prova de conceito. A funcionalidade principal do backend para processamento de imagens e extração de dados baseada em IA está implementada.

### Detalhes da Implementação

A funcionalidade principal gira em torno do processamento de imagens de rótulos nutricionais enviadas pelo usuário e da extração de dados usando um modelo de IA.

*   **Processamento de Imagem:**
    *   Quando uma imagem é enviada através do frontend, ela é encaminhada para o backend.
    *   O backend utiliza a biblioteca `Sharp` para:
        *   Redimensionar a imagem para uma largura máxima de 1024 pixels para otimizá-la para a análise da IA e reduzir o tempo de processamento.
        *   Comprimir a imagem para reduzir ainda mais o tamanho do arquivo sem perda significativa de qualidade relevante para a extração de texto.
    *   As imagens processadas são armazenadas temporariamente no diretório `server/uploads/`.

*   **Extração de Dados por IA:**
    *   A imagem processada é então enviada para a API de IA DeepSeek.
    *   O modelo específico utilizado é o `deepseek-reasoner`.
    *   O backend constrói um prompt instruindo a IA a analisar a imagem e extrair todas as informações nutricionais presentes, visando uma saída textual abrangente do conteúdo do rótulo.

*   **Endpoints da API:**
    *   **Backend (Servidor):**
        *   `POST /api/images/upload`: Recebe a imagem do cliente, processa-a, envia-a para a API DeepSeek e retorna o texto extraído.
        *   `GET /api/health`: Um endpoint de verificação de saúde para confirmar que o servidor está funcionando corretamente.
    *   **Frontend (Cliente):**
        *   O cliente faz uma requisição `POST` para `http://localhost:5555/api/images/upload` (ou a URL do backend configurada) para enviar a imagem para análise. A porta `5555` é o padrão para o servidor backend.

*   **Interação Frontend:**
    *   O componente `ImageUploader.js` no frontend React lida com:
        *   Seleção de imagem (arrastar e soltar ou caixa de diálogo de arquivo).
        *   Exibição de uma pré-visualização da imagem.
        *   Envio da imagem para o endpoint da API do backend.
        *   Exibição dos dados nutricionais textuais brutos retornados pelo backend ou uma mensagem de erro se o processo falhar.
        *   Um indicador de carregamento é exibido durante o processo de análise.

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

