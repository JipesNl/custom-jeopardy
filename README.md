# Game Show Host Application

This project is a React-based game show host application that allows a host to manage players, questions, and game
phases. It includes features like question selection, player management, and real-time updates using sockets.

---

# WARNING

This project uses dangerouslySet HTML for rendering questions and/or answers. Ensure that the content is sanitized and
safe to prevent XSS attacks, and never use untrusted content.

---

## Tasks to Be Completed Before Completion

1. **Final Question Handling**
   - Correct Final Jeopardy handling with score inputs and answer validation.

2. **Error Handling**:
   - Add robust error handling for API calls (e.g., fetching game state, updating players).
   - Handle edge cases like invalid `currentQuestion` paths or missing data.

3. **UI Enhancements**:
   - Improve the user interface for better usability and accessibility.
   - Add visual feedback for unavailable questions and player actions.

4. **Testing**:
   - Write unit tests for critical functions like `setActiveQuestion`, `getActiveQuestion`, and
     `setActiveQuestionCompleted`.
   - Perform end-to-end testing to ensure the application works as expected.

5. **Socket Events**:
   - Ensure all socket events (e.g., `player-changed`, `buzzed`) are handled correctly and tested.

---

## Potential Future Features

1. **Player Statistics**:
   - Add a leaderboard to display player rankings and scores in real-time.

2. **Game Board Editor**:
   - Allow hosts to create and customize game boards, categories, and questions.

3. **Timer for Questions**:
   - Add a countdown timer for answering questions to increase game tension.

---

## Running Instructions

1. **Install Dependencies**:
   ```bash
   npm install && npm install-all
   ```
2. **Start the Application**:
   ```bash
    npm start-prod
   ```
