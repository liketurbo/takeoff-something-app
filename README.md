# Simple contacts app with authorization

## Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - For type safety and it's a requirement
- [MUI](https://mui.com/) - Ready to use components
- [Next-Auth](https://next-auth.js.org/) - Authentication
- [React Hook Form](https://react-hook-form.com/) - Form handling

## Requirements

- [Node.js](https://nodejs.org/en/) (v16.17.0)

## Getting Started

```bash
npm install

# Create environment variables file
echo "NEXTAUTH_URL=http://localhost:3000" >> .env.local
echo "NEXTAUTH_SECRET=secret" >> .env.local

# Run the development server:
npm run dev

# Run the production server:
npm run build
npm run start
```

## FAQ

- **Why Next.js?** - I've been using Next.js for a while and I'm familiar with it, but for this project I could have used Create React App as well.
- **How to login?** - For now I hardcoded `jsmith:secret` as only valid credentials.
