# Application Flow Summary

## Landing Page (`routes/_index`)

The application starts at the landing page, which serves as the entry point.  
The user is presented with a button labeled **"Go to Editor"** that navigates to the `/editor` route.

## Editor Page (`routes/editor`)

The editor is the main workspace where users can manage rows and products.

### Key Features

- **Add Row**:  
   Users can click the **"Add Row"** button to open a modal (`RowModal`) for creating a new row. The modal allows users to specify the row's name, alignment, and associated products.

- **Edit Row**:  
   Users can edit an existing row by interacting with the row's edit button. This opens the same modal (`RowModal`) pre-filled with the row's current data.

- **Manage Products**:  
   Clicking the **"Manage Products"** button opens the `ProductModal`, where users can update product details.

## Row Management

Rows are displayed as draggable components (`ProductRow`) in the editor.  
Users can:

- Drag and drop rows to reorder them.
- Delete rows using the delete button, which prompts a confirmation dialog.
- Add or remove products within a row.

## Product Management

Products are managed within rows or globally via the `ProductModal`.  
Users can:

- Add new products.
- Edit existing products.
- Remove products from rows.

## Zoom Controls

The editor includes zoom controls (`ZoomControls`) to adjust the scale of the workspace for better visualization.

## State Management

The application uses a custom hook (`useEditorLogic`) to manage the state of rows, products, and modals.  
State updates trigger re-renders to reflect changes in the UI.

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
