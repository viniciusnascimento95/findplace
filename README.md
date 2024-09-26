# Event Filter App - Next.js

This project is a web application built with [Next.js](https://nextjs.org) that allows users to search and filter places for events. It aims to simplify event planning by providing a streamlined user interface for finding venues based on various filters such as location, capacity, and available dates.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Learn More](#learn-more)
- [Deployment](#deployment)
- [License](#license)

## Features

- 🔍 **Filter by location, date, and capacity**: Easily search for venues that match specific event criteria.
- 🗺️ **Interactive maps**: View venue locations on an interactive map.
- 💡 **Next.js optimizations**: Leveraging server-side rendering (SSR) and static site generation (SSG) for fast performance.
- 🎨 **Responsive UI**: A clean and responsive interface for mobile and desktop users.
- 🚀 **Deployed on Vercel**: Easily deployable for production use.

## Getting Started

To get a local copy of the project up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js installed. You can download it [here](https://nodejs.org).

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/viniciusnascimento95/findplace.git
    cd findplace
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Usage

You can start modifying the app by editing `app/page.tsx`. The page auto-updates as you edit.

- Customize venue filters in `components/FilterForm.tsx`.
- Adjust venue listing in `components/VenueList.tsx`.
- Explore the interactive map in `components/MapView.tsx`.

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## Learn More

To learn more about the technologies used in this project, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and APIs.
- [Learn Next.js](https://nextjs.org/learn) - A great tutorial to get started.
- [React Documentation](https://reactjs.org/) - Learn about React, the library Next.js is built on.
  
## Deployment

The app can be easily deployed on the [Vercel Platform](https://vercel.com) (recommended for Next.js projects):

1. Create a Vercel account [here](https://vercel.com/signup).
2. Connect your GitHub repository.
3. Deploy directly from Vercel or with the following CLI commands:
    ```bash
    vercel
    ```

For more details, visit the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

Distributed under the MIT License. See `LICENSE` for more information.
