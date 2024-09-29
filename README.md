# AI-Powered Image Recognition

### This repository contains a Progressive Web App (PWA) that leverages TensorFlow.js and the MobileNet model to perform real-time image classification. Users can upload images, and the app will identify objects within the images, providing class names and confidence scores.

Features:

- **Image Upload**: Upload any image and receive object recognition results powered by the MobileNet model.
- **Real-Time Classification**: Provides object class names and confidence levels for each prediction.
- **Progressive Web App (PWA)**: Installable on devices and works offline with caching through service workers.
- **Responsive Design**: Optimized for both desktop and mobile experiences.
- **Light/Dark Mode Support**: Automatically adapts to the user's system theme preferences.
- **Technologies Used**: Next.js: Frontend framework with server-side rendering and file-based routing.
- **TensorFlow.js**: For running the MobileNet model directly in the browser.
- **Tailwind CSS**: For styling and responsive design.
- **Next-PWA**: To enable Progressive Web App functionality, including offline caching and service workers.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
