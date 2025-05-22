# App Idea & Scope

## 1. Project Overview

*   **App Name:** LinkedIn Post Search Tool (Internal)
*   **Purpose:** To provide a simple internal web application for the user to easily search their own LinkedIn posts. The app will automatically ingest new posts as they are published on LinkedIn.
*   **Target User:** The primary user (sole user).
*   **Problem Solved:** Addresses the difficulty of finding old LinkedIn posts directly on the LinkedIn platform. Provides quick access to post content and URLs for reuse.
*   **Value Proposition:** Saves time and effort in locating past LinkedIn content, making it easier to reference, repurpose, or analyze.

## 2. Core Functionality (MVP Must-Haves)

1.  **Automatic Post Ingestion:**
    *   New posts made by the user on LinkedIn should be automatically fetched and stored in the application's database (Supabase).
    *   This will utilize the LinkedIn Member Data Portability API.
2.  **Post Display:**
    *   A clear and readable interface to display the stored LinkedIn posts.
    *   Each post display should ideally show:
        *   The main content/text of the post.
        *   The date and time the post was published.
3.  **Search & Filtering:**
    *   A primary search input field to search through the content of all stored LinkedIn posts.
    *   The search should be intuitive and return relevant posts based on keywords.
4.  **Copy Content Functionality:**
    *   For each displayed post, there must be an option (e.g., a button) to easily copy the full text content of the post to the clipboard.
5.  **Copy Post URL Functionality:**
    *   For each displayed post, there must be an option (e.g., a button) to easily copy the direct URL of the original LinkedIn post to the clipboard.

## 3. Future Enhancements (Out of Scope for MVP)

*   **Dashboard & Analytics:**
    *   Display statistics for posts: impressions, likes (and types of likes), comments.
    *   Show specific dates/times of posting and engagement metrics.
*   **AI Content Analysis:**
    *   Ability to send post content to an LLM for analysis (e.g., identifying content types that receive most engagement, analyzing comment sentiment).

## 4. Technical Preferences & Constraints

*   **Frontend Framework:** Next.js
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn UI
*   **Database:** Supabase
*   **External API:** LinkedIn Member Data Portability API (specifically 3rd Party endpoints as per [https://learn.microsoft.com/en-us/linkedin/dma/member-data-portability/member-data-portability-3rd-party/?view=li-dma-data-portability-2025-05](https://learn.microsoft.com/en-us/linkedin/dma/member-data-portability/member-data-portability-3rd-party/?view=li-dma-data-portability-2025-05))
*   **Performance/Security:** As an internal tool for personal use, high performance and advanced security measures are not primary concerns for the MVP. Focus is on functionality.

## 5. Visual Direction (Initial Thoughts)

*   Since no specific mockups are provided, the aim is for a clean, minimalist, and functional design.
*   Leverage Shadcn UI components for a modern and consistent look.
*   A simple layout:
    *   Possibly a main content area for displaying posts as cards.
    *   A search bar prominently displayed.
    *   Each post card should clearly present the post content snippet, date, and the "Copy Content" and "Copy URL" actions.

## Next Steps

*   Proceed to define Frontend Requirements.
*   Detail Design, UX, and UI Requirements.