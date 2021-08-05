# Zakari-NextJs

This is an example on how the Zakari Api can bu used, made with [Next.js](https://nextjs.org/) .

## Getting Started

First, setup your ```env.local``` file for your environnement variables :

```env
ZAKARI_API_ID=<Your zakari api id>
ZAKARI_API_KEY=<Your zakari api key>
NEXT_PUBLIC_ZAKARI_ENDPOINT=https://api.make-kreyol.com/spellcheck
```

The project use [NextAuth](https://next-auth.js.org/) which requires the following environnement variables :

```env
SECRET_COOKIE_PASSWORD=

NEXTAUTH_URL=http://localhost:4000

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

HASH_SECRET=
JWT_SECRET=
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## API access

The API server code is available on [GitHub](https://github.com/tmalo/zakari-api/).

There is an up and running version at this url [https://api.make-kreyol.com/](https://api.make-kreyol.com/hello).
To access it you will have to request some credentials to [@timalo_officiel](https://twitter.com/timalo_officiel).

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

However it is possible to deploy on other platforms as well.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
