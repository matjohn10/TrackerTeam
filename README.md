This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Made Using

[Ably](https://ably.com/) for their hackathon.

## Getting Started

First, install the required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Second, run the development server:

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

## More Info

TrackerTeam is a web app where you can start and track projects alone or with a team. You must make an account using the amazing authentication service by [Kinde](https://kinde.com/), and from there you have access to your project dashboard, where you can view and create your projects. Creating a project is really simple. Just add a name and that's it. If you want to collaborate, add a friend/colleague's email and voila. _The friend/colleague must be already registered with that email_.
Ably makes the experience great as you can see realtime updates made by yourself and other members. Notifications about a new project that you were added to, new task updates, and comments about a project with other members or yourself all in realtime.
The tasks are appointed a certain category (Upcoming (Todo), Doing, Completed (Done)). The categories are there to help with organizing your thoughts and the whole team's thoughts on how to proceed with the project's tasks. They can be easily moved between categories. When your dashboard is getting crowded and you want to reduce the number of visible tasks, you can move them to the backlog, where they will stay there forever unless you delete them.
Finally, the whole idea behind TrackerTeam is to help bring ease and organization to your projects, allowing realtime collaboration, and being visually simple.
