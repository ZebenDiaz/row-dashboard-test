# README: Tech Stack

This project is built using the following technologies:

## Framework

- **Remix**: A full-stack web framework for building modern, scalable web applications.

## Frontend

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Heroicons**: Beautiful, hand-crafted SVG icons for React.
- **Framer Motion**: A library for animations and gestures in React.

## State Management

- **Zustand**: A small, fast, and scalable state management library.

## Testing

- **Jest**: A JavaScript testing framework.
- **Testing Library**: Tools for testing React components.

## TypeScript

- **TypeScript**: A strongly typed programming language that builds on JavaScript.

## Build Tools

- **Vite**: A fast build tool and development server.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.
- **Autoprefixer**: A PostCSS plugin to add vendor prefixes automatically.

## Linting and Formatting

- **ESLint**: A tool for identifying and fixing problems in JavaScript/TypeScript code.
- **TypeScript ESLint**: Linting for TypeScript code.
- **eslint-plugin-react**: Linting rules for React.
- **eslint-plugin-jsx-a11y**: Accessibility linting for JSX.

## Node.js

- Requires **Node.js** version >=20.0.0.

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
