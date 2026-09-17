# Krushna Rajpure Portfolio

A Vite + React portfolio application with a public portfolio experience and a protected admin CMS. The app keeps the original design while adding a secure admin route and Supabase-backed content support.

## Features

- Public portfolio landing page with sections for About, Education, Skills, Projects, Experience, Achievements, and Contact
- Protected admin dashboard with section editors for profile and content management
- Supabase-ready content storage with a local storage fallback for development and offline use
- Secure admin login flow using Supabase Auth when configured, while preserving a local credentials fallback for simple setups

## Local development

1. Install dependencies:

	```bash
	npm install
	```

2. Copy the example environment file and add your values:

	```bash
	cp .env.example .env
	```

3. Start the app:

	```bash
	npm run dev
	```

4. Build for production:

	```bash
	npm run build
	```

## Supabase setup

Create a project in Supabase and add the following environment variables in a Vite-compatible `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_STORAGE_BUCKET=portfolio-media
```

Then run the SQL in [supabase/schema.sql](supabase/schema.sql) from the Supabase SQL editor to create the `portfolio_content` and `portfolio_media` tables and the row-level security policies.

### Admin authentication in Supabase

In your Supabase dashboard:

1. Go to Authentication > Users
2. Create the admin user account
3. Confirm the email and set a password
4. Sign in from the admin page in the app

The portfolio content is saved to the `portfolio_content` table; the app falls back to browser local storage if Supabase is not configured yet.

## Deployment

### Vercel

1. Import the project into Vercel
2. Set the environment variables from `.env`
3. Deploy the project

### Netlify or static hosting

1. Build the app with `npm run build`
2. Publish the generated `dist/` directory
3. Configure the same Vite environment variables in your hosting provider

## Notes

- The public portfolio is preserved as the default experience.
- The admin route is available at `/admin/login`.
- If Supabase is not configured, the content still works using browser storage and the default portfolio data so the site remains functional.
