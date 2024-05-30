# Intellisense

Empower your sales team with Intellisense, a comprehensive platform designed to streamline and optimize your sales processes. Track leads, manage customer relationships, forecast sales, and gain valuable insights with our intuitive interface and powerful API.

maintainer: @Emre Kiziltoprak @Sercan Noyan Germiyanoglu

Folder Structure

Front End Next.js App: 

Intellisense Front End:
```
│    app/
│    ├── assets/           # Images, fonts, and other static assets
│    ├── components/       # Reusable UI components
│    ├── context/          # Global state management using React Context
│    ├── data/             # Mock data or data fetching utilities
│    ├── features/         # Feature-based modules (e.g., authentication, products)
│    ├── hooks/            # Custom React hooks
│    ├── interface/        # TypeScript interfaces for data types
│    ├── layouts/          # Page layout components (e.g., header, footer)
│    ├── lib/              # External libraries or helper modules
│    ├── provider/         # Context providers to wrap the app
│    ├── services/         # API communication or backend service calls
│    ├── store/            # State management using Redux or similar
│    ├── favicon.ico       # Website favicon
│    ├── layout.tsx        # Main layout component
│    ├── page.module.css   # CSS module for styling the page
│    └── page.tsx          # Main page component
├── pages/                 # Next.js pages and routes
├── public/                # Static assets (images, fonts, etc.)
├── .eslintrc.json         # ESLint configuration for code linting
├── .gitignore             # Files and directories to ignore by Git
├── i18n.ts                # Internationalization configuration (Next.js i18n)
├── inversify.config.ts    # Dependency injection configuration (InversifyJS)
├── next-env.d.ts          # TypeScript declarations for Next.js environment
├── next-i18next.config.js # Configuration for i18next (localization library)
├── next.config.mjs        # Next.js configuration file
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Lockfile for deterministic dependency installation
```

Intellisense API: 
```
crm-base-api/
├── node_modules/       # External dependencies
├── src/                # Source Files
│   ├── configs/        # Configuration files
│   ├── controllers/    # Request handlers
│   ├── errors/         # Error handling middleware
│   ├── middlewares/    # Custom middleware
│   ├── models/         # Data models
│   ├── repositories/   # Data access logic
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── successResponse/# Success response structure
│   └── utils/          # Utility functions
├── test/               # Automated tests
├── app.ts              # Main application setup
├── index.ts            # Entry point
├── logger.ts           # Logging configuration
└── swaggerConfig.ts    # Swagger setup
```
## Installing dependencies, and starting project

1. Clone this repository
2. Run `yarn` at main directory and also in crm-base-api directory to install the project's dependencies
3. Run `yarn run dev` at main directory for front end and also do for back end in crm-base-api directory to start the development server

# Configurations

1. For maintaining Intellisense API edit .env file for further configurations, and run `yarn run generate-ormconfig` for applying configurations to ormconfig.json


# Getting started

1. For frontend, after executing `yarn run dev` at main directory, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2. For backend, after executing `yarn run dev` at crm-base-api directory, open [http://localhost:3307](http://localhost:3307) with your Postman/Insomnia Client to try Api endpoints.

You can start editing pages by modifying front end directory files. The page auto-updates as you edit the file.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
