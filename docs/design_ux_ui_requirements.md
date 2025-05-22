# Design, UX, and UI Requirements

## 1. Overall Aesthetic & Theme

*   **Theme:** A light theme will be implemented exclusively.
*   **Style:** Clean, minimalist, and functional, prioritizing ease of use and readability.
*   **Component Library:** Shadcn UI components will be used extensively for UI elements, ensuring a modern and consistent look and feel.
*   **Styling Engine:** Tailwind CSS will be used for all styling.

## 2. Post Card View (Visual Emulation of LinkedIn)

*   **Goal:** To provide a familiar feel without exact replication. Simplicity is key.
*   **Layout Elements:**
    *   **Content Area:** Clear visual separation for the main post text and any embedded media (images/videos).
    *   **Engagement Metrics Area:** A dedicated space to display like counts and comment counts.
    *   **Action Button Area:** A distinct section for the "Copy Content" and "Copy LinkedIn Post URL" buttons.
*   **Simplicity Focus:** Avoid complex LinkedIn-specific UI elements like profile pictures, intricate reaction icons, or detailed social interaction components. The focus is on the user's content and direct actions.

## 3. Post List View

*   **Goal:** A compact, scannable list of posts.
*   **Layout Elements per Item:**
    *   Small media thumbnail (if applicable).
    *   Text content snippet.
    *   Likes and comments counts (on the same line).
    *   Action buttons.
*   **Visuals:** Clean rows, possibly with subtle separators.

## 4. Action Buttons ("Copy Content" & "Copy LinkedIn Post URL")

*   **Appearance:** Simple text buttons (e.g., "Copy Content", "Copy URL") using Shadcn UI default button styling for clarity and consistency.
*   **Feedback:**
    *   Upon a successful copy action, a brief, non-intrusive visual confirmation (e.g., a "Copied!" message or a small toast notification) should appear.
    *   This feedback should be temporary and disappear automatically after 1-2 seconds.

## 5. Expandable/Collapsible Elements

*   **Text Content (Card View & List View):**
    *   Initially display a snippet (e.g., first few lines or a character limit).
    *   If content exceeds the snippet length, a "See more..." link/button will be visible.
    *   Clicking "See more..." expands the content fully and changes the link/button to "See less...".
    *   Clicking "See less..." collapses the content back to the snippet.
*   **Comments Section (Card View):**
    *   The comments count (e.g., "5 Comments") will act as the primary toggle.
    *   Clicking the comments count (or an associated small icon like an arrow/chat bubble) will expand/collapse the section displaying the actual comments.
    *   The icon (if used) should visually indicate the current state (e.g., arrow pointing down for expanded, right for collapsed).
*   **Modals (List View - Likes/Comments):**
    *   Clicking on like/comment counts in the list view will trigger a modal (using Shadcn UI Modal component).
    *   The modal will display the detailed information (e.g., list of comments).
    *   Modals should have a clear close button (e.g., "X" icon or "Close" button).

## 6. Search Bar UI

*   **Appearance:** A clean input field, styled using Shadcn UI components, placed at the top of the page (potentially in a fixed header).
*   **Placeholder Text:** Intuitive placeholder text like "Search posts..."

## 7. View Toggle (Card/List)

*   **Appearance:** Simple icon buttons (e.g., a "grid" icon for Card View, a "list" icon for List View) to switch between the two display modes.
*   **State Indication:** The active view's icon should be visually distinct (e.g., different color, heavier weight).

## 8. General UI Principles

*   **Consistency:** Maintain consistent use of Shadcn UI components, typography, spacing, and iconography throughout the application.
*   **Clarity:** Ensure all interactive elements are clearly identifiable and their purpose is understood.
*   **Feedback:** Provide appropriate visual feedback for user actions (e.g., button clicks, hover states).
*   **Accessibility (Basic):** While not a primary focus for a personal tool, aim for good color contrast and keyboard navigability where Shadcn UI defaults provide it.

## Next Steps

*   Proceed to define Backend Requirements.
*   Outline User Flow & Experience.