# Frontend para Teste Técnico Brasão Sistemas

Este é o frontend para o teste técnico, construído utilizando as seguintes tecnologias:

* **React**
* **shadcn/ui**
* **Tailwind CSS:** Um framework CSS utilitário para prototipagem rápida e estilização personalizada.
* **Vite:** Uma ferramenta de build extremamente rápida para desenvolvimento frontend.

## Tecnologias Utilizadas

* **React v19.1.0**
* **shadcn/ui**
* **Tailwind CSS v4.1.5**
* **Vite v6.3.5**
* **TypeScript v~5.8.3**
* **Axios v1.9.0:** Cliente HTTP para fazer requisições à API.
* **react-router-dom v7.5.3:** Para roteamento na aplicação React.
* **lucide-react v0.507.0:** Biblioteca de ícones.
* **class-variance-authority v0.7.1, clsx v2.1.1, tailwind-merge v3.2.0:** Utilitários para manipulação de classes CSS.

## Executando com Docker 🐳

Este projeto pode ser executado utilizando Docker. Certifique-se de ter o Docker instalado na sua máquina.

**Passos:**

1.  **Construir a imagem Docker:**

    Navegue até a raiz do projeto no seu terminal e execute o seguinte comando:

    ```bash
    docker build -t seu-nome-de-usuario/frontend-campos .
    ```

    (Substitua `seu-nome-de-usuario` por um nome local de sua preferência).

2.  **Executar o container Docker:**

    Após a construção bem-sucedida da imagem, execute o container com o seguinte comando:

    ```bash
    docker run -p 8080:80 seu-nome-de-usuario/frontend-campos
    ```

    Isso irá mapear a porta 80 do container para a porta 8080 da sua máquina local. Abra o seu navegador em `http://localhost:8080` para visualizar a aplicação.
    
## Passo a Passo para Rodar o Projeto Localmente

Siga estes passos para clonar e executar o projeto na sua máquina:

1.  **Clonar o Repositório do GitHub:**

    Abra o seu terminal ou prompt de comando e navegue até o diretório onde você deseja clonar o projeto. Em seguida, execute o seguinte comando, substituindo `SEU_REPOSITORIO_URL` pela URL do repositório do GitHub:

    ```bash
    git clone SEU_REPOSITORIO_URL
    ```

2.  **Navegar para o Diretório do Projeto:**

    Após a clonagem, entre no diretório do projeto:

    ```bash
    cd frontend-campos
    ```

3.  **Instalar as Dependências:**

    Este projeto utiliza o npm (Node Package Manager) para gerenciar as dependências. Certifique-se de ter o Node.js e o npm instalados na sua máquina. Execute o seguinte comando para instalar todas as dependências listadas no arquivo `package.json`:

    ```bash
    npm install
    ```

    Ou, se você preferir usar o yarn:

    ```bash
    yarn install
    ```

4.  **Configurar as Variáveis de Ambiente:**

    O projeto utiliza variáveis de ambiente para configurar a URL da API. Crie um arquivo chamado `.env.local` na raiz do seu projeto (se ele ainda não existir) e adicione a seguinte linha, ajustando a URL da API do backend conforme necessário:

    ```
    VITE_API_URL=http://localhost:5001/api
    ```

    **Observação:** O Vite carrega automaticamente as variáveis de ambiente do arquivo `.env.local` durante o desenvolvimento.

5.  **Executar a Aplicação em Modo
