# LinkedIn Post Search Tool - Development Roadmap

## Phase 1: Project Setup & Basic Frontend Shell

*   [x] **Task 1: Initialize Project & Version Control** (reference: `technical_infrastructure.md`)
    *   [x] Initialize Next.js project (using `create-next-app` with TypeScript and Tailwind CSS).
    *   [x] Set up Tailwind CSS.
    *   [x] Install and configure Shadcn UI with neutral color theme.
    *   [x] Initialize Git repository.
    *   [x] Create a new GitHub repository and push the initial project.
    *   [ ] Connect GitHub repository to Vercel for CI/CD.
*   [x] **Task 2: Basic Application Layout & Pages** (reference: `frontend_requirements.md`, `design_ux_ui_requirements.md`)
    *   [x] Create a basic page structure in Next.js (`app` directory with `layout.tsx` and `page.tsx`).
    *   [x] Implement a simple header component.
    *   [x] Implement a simple footer component.
    *   [x] Design the main content area placeholder.
    *   [x] Ensure the light theme is applied globally.
*   [x] **Task 3: Setup Supabase Project** (reference: `technical_infrastructure.md`, `backend_requirements.md`)
    *   [x] Create a new project on Supabase (Project: "LinkedIn Personal Analytics").
    *   [x] Note down Supabase URL and anon key.
    *   [x] Set up environment variables for Supabase keys in `.env.local`.
    *   [ ] Set up environment variables for Supabase keys in Vercel.
*   [x] **Task 4: Implement Basic Login UI (Frontend Only)** (reference: `frontend_requirements.md`, `design_ux_ui_requirements.md`, `user_flow_and_experience.md`)
    *   [x] Create a simple login page/component using Shadcn UI form elements (email/password fields, login button).
    *   [x] Style the login page.
    *   [x] For now, this will be UI only; Supabase Auth integration comes later.
    *   [x] Create a placeholder for the main application view that will be shown after "login".
*   [x] **Task 5: Basic Post Display Wireframe (Frontend with Mock Data)** (reference: `frontend_requirements.md`, `design_ux_ui_requirements.md`)
    *   [x] Create mock data structure for a few sample LinkedIn posts (JSON format).
    *   [x] Create a `PostCard` component (Shadcn UI Card) to display a single post.
        *   [x] Include placeholders for: Date/Time, Text Content, Media (image/video placeholder), Likes Count, Comments Count.
        *   [x] Add placeholder "Copy Content" and "Copy URL" buttons (Shadcn UI Button).
    *   [x] Create a `PostList` component that renders a list of `PostCard` components using the mock data.
    *   [x] Implement basic chronological display (newest first based on mock data).
    *   [x] Implement the basic structure for the "Card View".
    *   [x] Implement the basic structure for the "List View" (using mock data).
        *   [x] Include placeholders for: Thumbnail, Text Snippet, Likes/Comments counts, Action Buttons.
    *   [x] Add a simple UI toggle (e.g., buttons) to switch between Card View and List View (frontend state only for now).
*   [x] **Task 6: Search Bar UI (Frontend Only)** (reference: `frontend_requirements.md`, `design_ux_ui_requirements.md`)
    *   [x] Add a search input field (Shadcn UI Input) to the header or main content area.
    *   [x] Style the search bar.
    *   [x] Implement basic frontend filtering of the mock data list as the user types (debounce can be added later).

### Testing Checkpoint 1:
    *   [ ] Verify project setup on Vercel.
    *   [ ] Review basic layout and theme.
    *   [ ] Test login UI appearance (no functionality).
    *   [ ] Test mock post display in Card and List views.
    *   [ ] Test view toggle.
    *   [ ] Test basic search filtering with mock data.

## Phase 2: Backend Setup & Core Authentication

*   [ ] **Task 1: Setup Supabase Auth** (reference: `backend_requirements.md`, `user_flow_and_experience.md`)
    *   [ ] Configure email/password authentication in Supabase.
    *   [ ] Create the single user account directly in the Supabase dashboard.
    *   [ ] Install Supabase client library (`@supabase/supabase-js`).
*   [ ] **Task 2: Integrate Supabase Auth on Frontend** (reference: `frontend_requirements.md`, `user_flow_and_experience.md`)
    *   [ ] Implement login functionality:
        *   [ ] Connect login form to Supabase `signInWithPassword`.
        *   [ ] Handle successful login (e.g., redirect to main app view, store session).
        *   [ ] Handle login errors (display messages).
    *   [ ] Implement logout functionality:
        *   [ ] Add a logout button.
        *   [ ] Connect to Supabase `signOut`.
        *   [ ] Handle successful logout (e.g., redirect to login page).
    *   [ ] Implement route protection (ensure main app view is only accessible if logged in).
*   [ ] **Task 3: Define `posts` Table Schema in Supabase** (reference: `backend_requirements.md`)
    *   [ ] Use the Supabase SQL editor or dashboard to create the `posts` table with all specified columns (`id`, `user_id`, `linkedin_urn`, `text_content`, etc.).
    *   [ ] Set up `user_id` as a foreign key to `auth.users.id`.
    *   [ ] Define appropriate data types, constraints (NOT NULL, UNIQUE for `linkedin_urn` per user).
    *   [ ] Enable Row Level Security (RLS) on the `posts` table:
        *   [ ] Create policy for `SELECT` allowing users to read their own posts.
        *   [ ] Create policy for `INSERT` allowing users to insert their own posts (or handle this via service role in Edge Function).
        *   [ ] Create policy for `UPDATE`/`DELETE` if needed (likely not for MVP, posts are immutable once synced).
*   [ ] **Task 4: Create Backend API Endpoint to Fetch Posts** (reference: `backend_requirements.md`)
    *   [ ] Create a Next.js API route (e.g., `GET /api/posts`).
    *   [ ] Implement logic to fetch posts from Supabase for the authenticated user.
    *   [ ] Implement pagination (default 20, option for 50).
    *   [ ] Ensure posts are sorted chronologically (newest first).
    *   [ ] Protect the endpoint using Supabase Auth session verification.

### Testing Checkpoint 2:
    *   [ ] Test user login with Supabase Auth.
    *   [ ] Test user logout.
    *   [ ] Verify route protection (cannot access main app if not logged in).
    *   [ ] Manually insert a few sample posts into the Supabase `posts` table for the test user.
    *   [ ] Test the `GET /api/posts` endpoint (e.g., using Postman or directly from frontend if wired up).
    *   [ ] Verify RLS is working (if you try to access data as an unauthenticated user or different user - though harder to test with single user).

## Phase 3: Connecting Frontend to Backend & Implementing Core Features

*   [ ] **Task 1: Fetch and Display Real Posts on Frontend** (reference: `frontend_requirements.md`)
    *   [ ] Modify `PostList` component to fetch posts from `/api/posts` instead of using mock data.
    *   [ ] Handle loading states while fetching.
    *   [ ] Handle error states if fetching fails.
    *   [ ] Implement frontend logic for pagination controls (Next/Previous buttons, page size selector).
    *   [ ] Ensure Card View and List View correctly display data from the API.
*   [ ] **Task 2: Implement Expandable/Collapsible Content** (reference: `frontend_requirements.md`, `design_ux_ui_requirements.md`)
    *   [ ] Add "See more..."/"See less..." logic for long text content in Card View.
    *   [ ] Add "See more..."/"See less..." logic for text snippets in List View.
    *   [ ] Add expand/collapse logic for comments section in Card View (displaying mock comments for now, or just the count).
*   [ ] **Task 3: Implement Copy Content & Copy URL Buttons** (reference: `frontend_requirements.md`, `design_ux_ui_requirements.md`)
    *   [ ] Add JavaScript logic to copy post text to clipboard.
    *   [ ] Add JavaScript logic to copy post URL to clipboard.
    *   [ ] Implement "Copied!" visual feedback.
*   [ ] **Task 4: Implement Backend Search API Endpoint** (reference: `backend_requirements.md`)
    *   [ ] Create a Next.js API route (e.g., `GET /api/search`).
    *   [ ] Implement logic to use Supabase Full-Text Search (FTS) on `text_content` (and `content_title`) for the authenticated user.
        *   [ ] Ensure FTS is enabled/indexed on the relevant columns in Supabase.
    *   [ ] Implement pagination for search results.
    *   [ ] Protect the endpoint.
*   [ ] **Task 5: Connect Frontend Search Bar to Backend** (reference: `frontend_requirements.md`)
    *   [ ] Modify frontend search input to call `/api/search`.
    *   [ ] Update displayed posts with search results.
    *   [ ] Implement debouncing for the search input.
    *   [ ] Handle "No results found" message.

### Testing Checkpoint 3:
    *   [ ] Test fetching and displaying posts from Supabase.
    *   [ ] Test pagination for all posts.
    *   [ ] Test expandable/collapsible text and comments sections.
    *   [ ] Test "Copy Content" and "Copy URL" buttons with feedback.
    *   [ ] Test search functionality with various queries.
    *   [ ] Test pagination for search results.
    *   [ ] Test "No results found" message.

## Phase 4: LinkedIn API Integration & Automated Sync

*   [ ] **Task 1: LinkedIn API Credentials & Setup** (reference: `backend_requirements.md`, `technical_infrastructure.md`)
    *   [ ] Obtain LinkedIn API credentials for Member Data Portability API.
    *   [ ] Securely store credentials as environment variables in Vercel and Supabase (for Edge Function).
    *   [ ] Understand the API authentication flow (OAuth 2.0 likely).
*   [ ] **Task 2: Develop Supabase Edge Function for LinkedIn Sync** (reference: `backend_requirements.md`)
    *   [ ] Create a new Supabase Edge Function.
    *   [ ] Implement logic to:
        *   [ ] Authenticate with the LinkedIn API.
        *   [ ] Fetch new posts since the last sync (determine strategy: timestamp or last URN).
        *   [ ] For each new post, extract required fields (`urn`, `text`, `created`, `mediaCategory`, etc.).
        *   [ ] Transform data as needed for the `posts` table schema.
        *   [ ] Insert new posts into the Supabase `posts` table, associating with the correct `user_id`.
        *   [ ] Handle API rate limits and errors gracefully.
        *   [ ] Log activity and errors.
*   [ ] **Task 3: Schedule the Supabase Edge Function** (reference: `technical_infrastructure.md`)
    *   [ ] Configure the Edge Function to run once a day using Supabase's scheduling feature.
*   [ ] **Task 4: Displaying Media from Posts** (reference: `frontend_requirements.md`, `backend_requirements.md`)
    *   [ ] Based on `mediaCategory` and any media URLs/data from LinkedIn API:
        *   [ ] Update `PostCard` and List View item to display actual images/videos if available.
        *   [ ] This might require parsing media information from the API response and storing relevant URLs.
*   [ ] **Task 5: Displaying Likes & Comments (Counts & Modals)** (reference: `frontend_requirements.md`, `backend_requirements.md`)
    *   [ ] Investigate if LinkedIn API provides like/comment counts and actual comment text for *your* posts via the Member Data Portability API.
    *   [ ] If counts are available, store them and display them in Card/List views.
    *   [ ] If actual comments are available:
        *   [ ] Store comments (potentially in a separate `comments` table linked to `posts`).
        *   [ ] Implement logic to display comments in Card View (expand/collapse).
        *   [ ] Implement logic to display comments in a modal from List View.
    *   [ ] If detailed comment/like data is not available or too complex for MVP, stick to displaying counts if available, or omit if not.

### Testing Checkpoint 4:
    *   [ ] Manually trigger the Supabase Edge Function to test LinkedIn sync.
    *   [ ] Verify new posts from LinkedIn appear in the app.
    *   [ ] Verify the daily schedule for the Edge Function is active.
    *   [ ] Test display of media (images/videos) in posts.
    *   [ ] Test display of like/comment counts and comment viewing (if implemented).
    *   [ ] Monitor Edge Function logs for any errors during sync.

## Phase 5: Final Polish & Review

*   [ ] **Task 1: UI/UX Refinements** (reference: `design_ux_ui_requirements.md`)
    *   [ ] Review all UI elements for consistency and clarity.
    *   [ ] Check for any layout issues on common desktop screen sizes.
    *   [ ] Ensure all interactive elements have appropriate feedback.
    *   [ ] Add "Last synced: [Date/Time]" indicator to the UI.
*   [ ] **Task 2: Error Handling Review** (reference: `user_flow_and_experience.md`)
    *   [ ] Test all error handling paths (login fails, API fails, no search results, sync issues).
    *   [ ] Ensure messages are user-friendly.
*   [ ] **Task 3: Performance Quick Check** (reference: `security_and_performance.md`)
    *   [ ] Verify search speed and post loading times are acceptable.
    *   [ ] No deep optimization, just ensure it's not noticeably slow.
*   [ ] **Task 4: Code Cleanup & Readme**
    *   [ ] Remove any unused code or console logs.
    *   [ ] Add basic comments to complex parts of the code if any.
    *   [ ] Create/update a `README.md` with setup instructions and overview.
*   [ ] **Task 5: Final User Acceptance Testing (UAT)**
    *   [ ] Perform a full walkthrough of the application, testing all features as the end-user.

### Deployment:
    *   [ ] Ensure final version is deployed to Vercel.