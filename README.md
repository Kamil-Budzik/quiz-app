# Quiz Application

This is a Vue.js-based Quiz Application that allows users to select the difficulty of the questions and fetches trivia questions accordingly. The application is fully responsive and uses Tailwind CSS for styling.

## Live Demo

Check out the live demo of the application [here](https://quiz-app-kamil.netlify.app/)

## Features

- **Dynamic Question Fetching**: Fetches questions based on the selected difficulty (`easy`, `medium`, `hard`).
- **Responsive Design**: The application is fully responsive, with a clean and modern user interface.
- **Error Handling**: Centralized error handling for all API requests.
- **Reusability**: Components and API helper functions are designed to be reusable across different parts of the application.

## Technologies Used

- **Vue.js**: The Progressive JavaScript Framework.
- **TypeScript**: For type safety and improved development experience.
- **Axios**: For making HTTP requests to the trivia API.
- **Tailwind CSS**: For styling the application.
- **Open Trivia Database (opentdb.com)**: The API used to fetch trivia questions.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Additional Features

In addition to the general requirements, the following features have been implemented:

- **Dynamic Difficulty Selection**:
    - Users can select the difficulty level (`easy`, `medium`, `hard`) from a dropdown menu before starting the quiz. This selection directly influences the type of questions fetched from the Trivia API.

- **Difficulty-Based Question Filtering**:
    - Questions are dynamically filtered based on the selected difficulty level, allowing for a tailored quiz experience that matches the user's skill level.

- **Customizable Question Amount**:
    - Users have the ability to choose the number of questions they want to answer in the quiz. This provides flexibility, allowing users to select from a predefined set of options (e.g., 10, 15, 20, 25 questions) before starting the quiz.

- **Complex Navigation Logic**:
    - The quiz implements a complex navigation logic for the "Next" button. When clicking "Next," the user is taken to the next unanswered question. If the user reaches the last question and there are still unanswered ones, the "Next" button will loop back to the first unanswered question, ensuring that all questions are addressed before the quiz is submitted.
