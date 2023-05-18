# Test task by Pavel Lavrentev pashevka@gmail.com for Senior Frontend Faraway (https://faraway.com/) 

## Getting started

1. Download/clone project.

   ```bash
   git clone https://github.com/Pashevka/react-app.git
   ```

2. Access the project directory.

   ```bash
   cd react-app
   ```

4. Install dependencies.

   ```bash
   npm install
   ```

5. Start dev server with hot reload at http://localhost:3000.
   ```bash
   npm run dev
   ```

## Recommended VS Code extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Other commands

### Lint commands

```bash
npm run lint
```

### Build commands

```bash
npm run build
```

### Run the app in production mode at http://localhost:3000.

```bash
npm run serve
```

### Test commands

- Run unit tests and watch
  ```bash
  npm run test:unit
  ```
- Run unit tests with coverage
  ```bash
  npm run test:unit:coverage
  ```
- Run e2e tests
  ```bash
  npm run test:e2e
  ```

## Comments
This application consists of three pages: a list of items, a single item page, and a 404 page.

On the list of items page, 10 cards are displayed. The API that I found returns batches of 20 items from the server, so I simulated pages of 10 items each. Additionally, there are two select dropdowns on this page for filtering by gender and status, as well as a text search field.

On the single item page, the main information about the character is displayed. The data can be edited locally. If an invalid ID is entered, the user will be redirected to the 404 page.

The application includes several unit and end-to-end tests. I understand that in a real application, there would be more tests. The application uses both CSS modules and regular CSS for styling. In hindsight, I realize that I should have also used Sass to demonstrate its usage.

### Additional Note
I also wanted to add Sonar for checking the application, but I realized that it's better not to share personal keys for this purpose.