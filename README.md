
# 📚 Pokéapi

Imagine a modern, fast, and visually appealing Pokédex where you can explore the Pokémon world from any device.

This app was built with React + TypeScript and consumes data in real time from the PokéAPI.
It features a dynamic search system, smooth animations with Framer Motion, and a dark mode reminiscent of the aesthetics of classic games, but adapted to modern web design.

More than a technical project, it's a demonstration of how to apply UI/UX best practices, web performance, and scalable architecture with React.

---

## 🚀 Project Setup

Run the command below to install all the necessary dependencies for this project:

```
  npm install
```

## Features

* 🔍 Search Bar: Allows users to quickly find Pokémon by name.
* 📄 Paginated Pokémon List: Displays Pokémon in an organized paginated list for smooth browsing.
* 🧩 Detailed Pokémon View: Provides complete information about each Pokémon, including stats, abilities, and types.
* 🌗 Responsive Design: Fully optimized for different screen sizes, ensuring a smooth experience on both desktop and mobile devices.
* ⚡ Dynamic Data Loading: Fetches Pokémon data dynamically from the API to improve performance and efficiency.
* 🎨 Clean and Intuitive UI: Built with attention to user experience and visual consistency.

### 🧩 Dependencies

- **React** – v19.1.1
- **Sass** – v1.92.0 
- **TypeScript** – v5.8.3
- **Normalize.css** – v8.0.1
- **Framer-motion** – v12.23.12
- **React-query** – v5.89.0
- **Eslint** – v9.33.0

---

## Diagram Folders

Below is a high-level overview of the folder structure used in this project.

```
src/
├── assets/
│   └── styles/
│       ├── colors/
│       │   └── colors.css
│       ├── fonts/
│       │   └── font-sizes.css
│       └── mixins/
│           ├── animation.scss
│           └── mixins.scss
|
├── components/
│   ├── pokemonCard/
│   │   ├── pokemonCard.tsx
│   │   └── pokemonCard.scss
│   ├── pokemonsList/
│   │   ├── pokemonList.tsx
│   │   └── pokemonList.scss
│   └── ui/
│       ├── error/
│       │   ├── error.tsx
│       │   └── error.scss
│       ├── loader/
│       │   ├── loader.tsx
│       │   └── loader.scss
│       └── notFound/
│           ├── notFound.tsx
│           └── notFound.scss
|
├── contexts/
|   ├── global.context.tsx
|   └── global.provider.tsx
|
├── interfaces/
|   ├── pokemons-data.interface.ts
|   └── pokemons-result.interface.ts
|
├── utils/
|   ├── pokemon-image.ts
|
├── App.tsx
├── App.scss
├── main.tsx
└── vite-env.d.ts
```
---

### API Reference

`getInitialPokemons(url: string)` Fetches the first set of Pokémon data from the API, and extends the pokemon list 
`getPokemons(list: PokemonList)`  Returns detailed Pokémon information from a given list.
`getPokemonByName(name: string)`  Searches and returns a Pokémon by name.

---

### Technical Decision

## Styling
The project uses both Sass and CSS variables.
Sass is used for mixins, animations, and reusable layout utilities, while CSS variables are used for global theming and color management.
This approach combines the flexibility of Sass with the runtime adaptability of native CSS variables.

## Bem Styles
I decided to use the BEM (Block Element Modifier) methodology to name CSS classes throughout the application.
This approach makes class names easier to read, ensures a clear and predictable structure, and helps maintain consistent styling across components.

## React Context
I decide to use React Context because it performs a very simple but essential task in this project: managing a global state that controls the scroll behavior.
When a Pokémon’s detailed information is opened, the global scroll is temporarily disabled to keep the focus on the modal.
Using Context was the most straightforward and efficient solution for this case — lightweight, easy to maintain, and perfectly suited for managing UI-related global state without adding unnecessary complexity.

## Fetch above Axios
I decided to use the Fetch API to make HTTP requests because it provides a simple and modern way to work with promises.
I’ve used it frequently in JavaScript projects, and for this case — consuming the PokéAPI — it’s more than enough.
There was no need to add extra complexity with external libraries like Axios since Fetch already covers all the necessary features for this project.

## Typescript
I decided to use TypeScript in this project to improve code reliability and maintainability. TypeScript provides static typing, which helps catch errors early during development and ensures better control over data structures and API responses.


### 🧪 Testing
This project uses **Jest** for unit testing

Run all the tests whit: 

```
	npm test

```

## Tests cover:

* Pokémon fetching and error handling.

* API integration logic.

* Utility functions and context behaviors.

📌 Available Scripts

	npm run dev         # Start in watch mode
	npm run start:prod  # Start for production

🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss your ideas.