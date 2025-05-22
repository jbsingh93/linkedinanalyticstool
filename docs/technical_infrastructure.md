# Technical Infrastructure

## 1. Hosting

*   **Frontend & Backend (Next.js Application):**
    *   Hosted on Vercel.
    *   Vercel will handle the deployment, build process, and serving of the Next.js application (including API routes).
*   **Database & Authentication Backend (Supabase):**
    *   Supabase's cloud hosting platform will be used.
    *   This includes the PostgreSQL database, Supabase Auth services, and Supabase Edge Functions.

## 2. Version Control

*   **Repository:** GitHub will be used for version control of the Next.js application codebase.
*   **Deployment Trigger:** Vercel will be connected to the GitHub repository for automatic deployments upon pushes/merges to the main branch (or a specified production branch).

## 3. Scheduled Tasks (Cron Job for LinkedIn Sync)

*   **Mechanism:** A Supabase scheduled Edge Function.
*   **Frequency:** Once per day.
*   **Purpose:** To connect to the LinkedIn Member Data Portability API, fetch new posts, and store them in the Supabase database.
*   **Configuration:** The schedule will be configured within the Supabase dashboard or via Supabase CLI.

## 4. Key Technologies & Services Stack

*   **Application Framework:** Next.js (React)
*   **UI Styling:** Tailwind CSS
*   **UI Components:** Shadcn UI
*   **Database:** Supabase (PostgreSQL)
*   **Authentication:** Supabase Auth
*   **Serverless Functions (for cron):** Supabase Edge Functions
*   **External API:** LinkedIn Member Data Portability API
*   **Hosting Platform:** Vercel
*   **Version Control:** GitHub

## 5. Environment Variables (Anticipated)

The application will require the following environment variables, to be configured in Vercel (and locally for development):

*   **Supabase Connection:**
    *   `NEXT_PUBLIC_SUPABASE_URL`: The public URL for the Supabase project.
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public anonymous key for the Supabase project.
    *   `SUPABASE_SERVICE_ROLE_KEY`: The service role key for backend operations (e.g., within the Supabase Edge Function for LinkedIn sync, if it needs elevated privileges beyond user RLS for inserting data).
*   **LinkedIn API Credentials:**
    *   `LINKEDIN_CLIENT_ID`: Client ID for the LinkedIn application.
    *   `LINKEDIN_CLIENT_SECRET`: Client Secret for the LinkedIn application.
    *   `LINKEDIN_ACCESS_TOKEN`: The access token for making API calls (Note: The process for obtaining and refreshing this token needs to be handled, potentially by the Edge Function or a manual setup initially).
    *   `LINKEDIN_REDIRECT_URI`: (If applicable for the OAuth flow used by the Member Data Portability API).
*   **Supabase Auth JWT Secret (if customized):**
    *   `SUPABASE_JWT_SECRET`: If JWTs are customized or signed with a specific secret. (Often managed by Supabase by default).
*   **Application URL (usually managed by Vercel):**
    *   Vercel typically provides system environment variables like `VERCEL_URL` or `NEXT_PUBLIC_VERCEL_URL` which can be used if the application needs to know its own public URL.

*Security Note:* All sensitive keys (Service Role Key, LinkedIn Client Secret, Access Tokens, JWT Secret) must be stored securely as environment variables and not hardcoded into the application. `NEXT_PUBLIC_` prefixed variables are exposed to the client-side; others are server-side only.

## 6. Domain & DNS

*   Initially, the application can run on Vercel's default domain (e.g., `your-project.vercel.app`).
*   A custom domain can be configured later via Vercel and DNS settings if desired.

## Next Steps

*   Define Security & Performance considerations.
*   Compile all documents into a final PRD and create the development roadmap.