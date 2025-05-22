# Backend Requirements

## 0. User Authentication

*   **Provider:** Supabase Auth will be used for user authentication.
*   **Setup:**
    *   Configure Supabase Auth for email/password authentication. Since it's a single-user internal tool, the user account can be pre-created directly in Supabase.
*   **Protected API Endpoints:** All API endpoints that provide access to post data (e.g., `/api/posts`, `/api/search`) must be protected and require a valid Supabase Auth session token from the user.
*   **Session Management:** Supabase handles session management. Next.js backend (API routes) will verify the session/token for requests.

## 1. LinkedIn Data Ingestion & Storage

*   **Data Source:** LinkedIn Member Data Portability API (3rd Party endpoints).
*   **Frequency:** The backend will automatically check for new LinkedIn posts once a day via a scheduled task (cron job).
*   **Data to Store:** All fields provided by the LinkedIn API for each post will be stored in the Supabase database. These include:
    *   `urn` (Primary Key, The URN of the share)
    *   `text` (The text content of the share)
    *   `mediaCategory` (The category of the media in the share, if any)
    *   `shareUrn` (The URN of the original share, if this is a reshare)
    *   `originalShareUrn` (The URN of the UCG post if this share is a UCG Post)
    *   `created` (Timestamp of when the share was created)
    *   `lastModified` (Timestamp of when the share was last modified)
    *   `contentCallToActionLabel` (Call to action label on the content, if any)
    *   `contentEntities` (Entities mentioned in the content, if any)
    *   `contentLandingPageUrl` (Landing page URL of the content, if any)
    *   `contentTitle` (Title of the content, if any)
    *   `visibility` (The visibility setting of the share)
    *   *(Note: Storage for likes and comments data will depend on availability and structure from the API. The primary focus for MVP is the post content itself as listed above. If like/comment counts are easily available with the post data, they will be stored too.)*
*   **Database:** Supabase (PostgreSQL).
*   **User Association:** The `posts` table should have a `user_id` foreign key column referencing the `id` in Supabase's `auth.users` table to associate posts with the authenticated user. This is crucial for data security and ensuring users only see their own posts (though for a single-user app, it's simpler but good practice).
*   **Table Schema (Preliminary for `posts` table - Updated):**
    *   `id` (Primary Key, e.g., using `urn` from LinkedIn or a separate UUID)
    *   `user_id` (UUID, Foreign Key to `auth.users.id`, NOT NULL)
    *   `linkedin_urn` (Text, unique for a user, stores the `urn` from LinkedIn)
    *   `text_content` (Text, stores the `text` from LinkedIn)
    *   `media_category` (Text, nullable)
    *   `share_urn_original` (Text, nullable)
    *   `ucg_post_urn` (Text, nullable)
    *   `created_at_linkedin` (TimestampTZ, stores `created` from LinkedIn)
    *   `last_modified_linkedin` (TimestampTZ, stores `lastModified` from LinkedIn)
    *   `cta_label` (Text, nullable)
    *   `content_entities_json` (JSONB, nullable, to store `contentEntities` array)
    *   `landing_page_url` (Text, nullable)
    *   `content_title` (Text, nullable)
    *   `visibility_setting` (Text, nullable)
    *   `likes_count` (Integer, nullable, default 0 - if available directly)
    *   `comments_count` (Integer, nullable, default 0 - if available directly)
    *   `created_at_system` (TimestampTZ, default `now()`, when record is inserted into Supabase)
    *   `updated_at_system` (TimestampTZ, default `now()`, when record is updated in Supabase)

## 2. Search Functionality Backend

*   **Mechanism:** Supabase's built-in Full-Text Search (FTS) capabilities will be used.
*   **Implementation:**
    *   A Next.js API route will be created to handle search requests from the frontend. This route will be protected by Supabase Auth.
    *   It will take a search query string as input.
    *   It will use the Supabase client library's `textSearch` method to query the `text_content` and `content_title` columns of the `posts` table, *filtered by the authenticated `user_id`*.
    *   Relevant text columns in Supabase will be indexed for FTS.
*   **Results:** The API endpoint will return a list of matching posts.

## 3. API Endpoints (Next.js API Routes - All Protected)

1.  **`GET /api/posts` (Fetch Posts with Pagination):**
    *   Retrieves a list of stored LinkedIn posts *for the authenticated user*.
    *   **Query Parameters:** `page`, `limit`.
    *   **Response:** JSON object (posts, totalPages, currentPage).
    *   **Sorting:** Reverse chronological order.
2.  **`GET /api/search` (Search Posts with Pagination):**
    *   Searches posts *for the authenticated user*.
    *   **Query Parameters:** `q`, `page`, `limit`.
    *   **Response:** JSON object (posts, totalPages, currentPage).
    *   **Sorting:** FTS relevance or reverse chronological.

## 4. Scheduled Tasks (Cron Job)

*   **Purpose:** To periodically fetch new posts from LinkedIn *for the configured user*.
*   **Frequency:** Once per day.
*   **Logic:**
    1.  Authenticate with the LinkedIn API (using stored credentials for the app's designated LinkedIn user).
    2.  Fetch recent posts.
    3.  For each new post, associate it with the pre-defined `user_id` in Supabase and store it.
    4.  Handle errors.
*   **Implementation:** Next.js API route triggered by an external cron service or Supabase scheduled function.

## 5. Authentication & Authorization (Backend - Updated)

*   **LinkedIn API Authentication:** Secure storage of LinkedIn API credentials (environment variables).
*   **Application User Authentication:** Supabase Auth handles user login and session management. Backend API routes will validate sessions.
*   **Data Authorization:** All data access (posts) will be scoped to the authenticated user via `user_id` in database queries (Row Level Security in Supabase should be enabled for the `posts` table).

## Next Steps

*   Define User Flow & Experience (already done, but ensure it aligns with these auth updates).
*   Detail Technical Infrastructure.