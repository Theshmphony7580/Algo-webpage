
# AuraMart

AuraMart is a modern e-commerce web application built with Vite, React, and Shadcn/ui. It showcases a variety of features commonly found in e-commerce websites, along with some unique additions.

## Features

- **Product Catalog:** Browse and search for products.
- **Product Details:** View detailed information about each product.
- **Shopping Cart:** Add products to a cart and manage them.
- **Wishlist:** Save products for later.
- **Recently Viewed:** Keep track of products you've recently seen.
- **Product Comparison:** Compare the features of different products.
- **AR Preview:** View products in Augmented Reality.
- **Voice Search:** Search for products using your voice.
- **Gamification:** Earn points and badges for interacting with the site.
- **PWA Support:** Install the app on your device for a native-like experience.
- **Dark Mode:** Switch between light and dark themes.
- **And more:** Including a theme builder, live purchase notifications, and a back-to-top button.

## Tech Stack

- **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **UI:** [Shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest), React Context
- **Animation:** [Framer Motion](https://www.framer.com/motion/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/AuraMart.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Running the App

To start the development server, run:

```sh
npm run dev
```

This will start the app in development mode, which you can view at `http://localhost:8080`.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the code using ESLint.
- `npm run preview`: Serves the production build locally.

## Folder Structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui/
│   ├── contexts/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── package.json
└── README.md
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
