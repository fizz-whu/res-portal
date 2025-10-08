# res-portal

React app deployed to AWS CloudFront and S3.

## Local Development

```bash
npm install
npm run dev
```

## Deployment

This project automatically deploys to AWS S3 and CloudFront when changes are pushed to the `main` branch.

### Required GitHub Secrets

Configure the following secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

- `AWS_ACCESS_KEY_ID` - Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret access key
- `AWS_REGION` - AWS region (e.g., `us-east-1`)
- `S3_BUCKET` - Your S3 bucket name
- `CLOUDFRONT_DISTRIBUTION_ID` - Your CloudFront distribution ID

## Vite + React

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
