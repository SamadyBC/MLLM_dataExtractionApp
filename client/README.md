# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Sobre o Frontend

A aplicação localizada no diretório `client` é uma interface web desenvolvida utilizando a biblioteca React, inicializada com o Create React App.

### Estrutura de Diretórios

*   `public/`: Contém os arquivos estáticos da aplicação, como o `index.html` principal, favicons e outras mídias que não passam pelo processo de build do Webpack. O `index.html` é o ponto de entrada HTML para a aplicação React.
*   `src/`: É o coração da aplicação React. Contém todo o código-fonte JavaScript, CSS, e componentes da interface.
*   `src/components/`: Dentro de `src/`, este diretório é usado para armazenar os componentes React reutilizáveis da aplicação.

### Componentes Principais

*   `src/index.js`: É o ponto de entrada da aplicação React. Ele é responsável por renderizar o componente principal da aplicação (normalmente o `<App />`) no elemento DOM raiz (geralmente uma `div` com `id='root'`) no arquivo `public/index.html`.
*   `src/App.js`: É o componente principal da aplicação. Ele define a estrutura geral da interface, incluindo o layout básico como cabeçalho, conteúdo principal e rodapé. É dentro deste componente que outros componentes mais específicos, como o `ImageUploader`, são integrados.
*   `src/components/ImageUploader.js`: Localizado em `src/components/`, este é o componente central da funcionalidade de frontend. Ele gerencia o upload de imagens (permitindo arrastar e soltar ou selecionar arquivos), exibe uma pré-visualização da imagem selecionada, envia a imagem para uma API backend para análise e, por fim, exibe os resultados da análise nutricional recebidos.

### Fluxo de Execução da Aplicação

O fluxo de execução da aplicação frontend é o seguinte:

1.  **Renderização Inicial**: A aplicação é carregada no navegador. O arquivo `public/index.html` serve como base, e o script `src/index.js` é executado. Este script utiliza o ReactDOM para renderizar o componente principal `<App />` dentro da `div` com `id="root"` no `index.html`.
2.  **Exibição do `ImageUploader`**: O componente `App.js`, uma vez renderizado, exibe a interface principal da aplicação, que inclui o componente `ImageUploader` (`src/components/ImageUploader.js`). Este componente é o responsável pela interação do usuário para o upload e análise de imagens.
3.  **Seleção da Imagem pelo Usuário**: O usuário interage com o componente `ImageUploader` para selecionar uma imagem. Isso pode ser feito de duas maneiras:
    *   Arrastando e soltando um arquivo de imagem na área designada.
    *   Clicando na área de upload para abrir um diálogo de seleção de arquivos e escolhendo uma imagem.
4.  **Pré-visualização da Imagem**: Após a seleção, o `ImageUploader` exibe uma pré-visualização da imagem escolhida na interface, permitindo que o usuário veja qual imagem será enviada para análise.
5.  **Início da Análise**: O usuário clica no botão "Analisar Imagem" (ou similar) no componente `ImageUploader`.
6.  **Requisição para a API**: Ao clicar no botão, o `ImageUploader` prepara os dados da imagem e envia uma requisição HTTP para a API backend.
    *   Esta é uma requisição do tipo `POST`.
    *   A imagem é enviada para o endpoint `http://localhost:5000/api/images/upload` (ou o endpoint configurado para o backend).
    *   A biblioteca `axios` é utilizada para realizar esta chamada assíncrona.
7.  **Tratamento da Resposta da API**:
    *   **Sucesso**: Se a API processar a imagem com sucesso e retornar os dados nutricionais, o `ImageUploader` recebe essa resposta. Os dados são então formatados e exibidos na interface para o usuário.
    *   **Erro**: Se ocorrer qualquer erro durante a chamada à API (por exemplo, falha de rede, erro no servidor backend, formato de imagem inválido), o `ImageUploader` captura esse erro e exibe uma mensagem apropriada para o usuário.
8.  **Estado de Carregamento**: Durante o período em que a imagem está sendo enviada para a API e o frontend aguarda a resposta, um indicador de carregamento (spinner ou mensagem) é exibido na interface do `ImageUploader`. Isso informa ao usuário que o processamento está em andamento.
