## Quick Overview

_J-SNKRS — yours way into sneakers! Nike SNKRS from JAPAN_

The online marketplace that offers you a high variety of sneakers.

> In this version, back-end and front-end work on the same domain without any CORS policy issues. REST API is available at the /api subpath.

## Tech Stack

**Front-end:** React + Vite, Redux, SASS & SCSS, Tailwind CSS, shadcn/ui.
</br>
**Back-end:** Express.js, Redis, MySQL.

## Dependencies

- Install [Git](https://git-scm.com/) on your machine to clone the Github repository.
- Install [Node.js](https://nodejs.org/) on your machine to build and run the application locally.

## Clone Repository

Create a new directory where you want to deploy the application, then clone the Github repository into it:

```bash
git clone https://github.com/artndev/j-snkrs.git .
```

Navigate to the project directory:

```bash
cd root
```

Change the working branch from _master_ (production branch) to _dev-public_ (public development branch) due to the specialties of the production and development environments:

```bash
git checkout dev-public
```

## Configure Environmental Variables

Open the _.env.local_ file located in the client directory and fill in the required environmental variables:

```env
# Your Stripe credentials can be found at:
# https://dashboard.stripe.com/test/dashboard
# https://dashboard.stripe.com/test/settings/user
VITE_STRIPE_PUBLISHABLE_KEY=...
VITE_STRIPE_ACCOUNT_ID=...
```

Open the _.env.local_ file located in the server directory and fill in the required environmental variables:

```env
# Your Redis credentials
REDIS_URL=...

# Your Stripe credentials can be found at:
# https://dashboard.stripe.com/test/dashboard
STRIPE_SECRET=...

# UUIDv4 secrets used for generating sessions, tokens and mails
# To generate UUIDv4 token, follow link below:
# https://www.uuidgenerator.net/version4
SESSION_SECRET=...
JWT_SECRET=...
MAGIC_LINK_SECRET=...

# Port remains untouchable
PORT=8000

# Your Google credentials can be found at:
# https://console.cloud.google.com
# Fill in the authorization callback URL field:
# http://localhost:8000/api/google/callback
GOOGLE_API_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Your Github credentials can be found at:
# https://github.com/settings/developers
# Fill in the authorization callback URL field:
# http://localhost:8000/api/github/callback
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# The bot SMTP email credentials to send verification and confirmation emails
# You can use one of these services to achieve this:
# https://help.mail.ru/enpostmaster/api (totally free but not suitable for the production)
# https://sendgrid.com
# https://www.mailgun.com
NODEMAILER_USER=...
NODEMAILER_PASSWORD=...

# Your DB credentials
# Table schemas can be found in server\src\schemas
MYSQL_HOST=...
MYSQL_PORT=...
MYSQL_USER=...
MYSQL_PASSWORD=...
MYSQL_DBNAME=...
```

## Build & Run Application with Node.js

Return to the root directory:

```bash
cd ../
```

Run the command below to build and run the application with Node.js:

```bash
npm run start
```

## Access Application

Once the build is completed successfully, the application will be available at http://localhost:8000.
