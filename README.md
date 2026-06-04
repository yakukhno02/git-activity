# Git Activity Heatmap

Interactive GitHub activity visualizer built with Next.js and TypeScript.

## Features

- GitHub contribution heatmap
- Commits, Pull Requests and Issues tracking
- Activity filters
- Current and longest streak calculation
- Shareable profile URLs
- GitHub GraphQL API integration

## Demo

https://git-heatmap.vercel.app

Example:

https://git-heatmap.vercel.app/yakukhno02

![img.png](screenshots/example.png)

## Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- GitHub GraphQL API
- Vercel

## Local Setup

```bash
git clone https://github.com/yakukhno02/git-activity.git
cd git-activity
npm install
```

Create `.env.local`

```env
GITHUB_TOKEN=your_github_token
```

Run development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Deployment

The project is deployed on Vercel and automatically updates after every push to the `main` branch.