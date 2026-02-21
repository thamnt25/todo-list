# Todo List

A Todo List app is built with both a client and a backend site. With a friendly interface, the user can interact with the app easily

**Live Demo**: https://todo-list-git-main-tham-nguyens-projects-4283b995.vercel.app/


<p align="center">
  <img width="907" height="907" alt="Screenshot 2026-02-20 221703"
       src="https://github.com/user-attachments/assets/153e8457-2650-45fa-ab0b-6e15b8f253f8" />
</p>



## Built With

- React
- Vite
- Express
- Sqlite
- Axios
- Bootstrap

## Project Structure

```text
todo-list/
  client/
    public/
    src/
    index.html
    vite.config.js
  server/
    index.js
    todoRouter.js
  vercel.json
  package.json
```

## API Endpoints

Base path: `/api/todos`

- `GET /api/todos` - get all todos
- `POST /api/todos` - create todo
- `PUT /api/todos/:id` - update todo
- `DELETE /api/todos/:id` - delete todo

Request body for `POST`/`PUT`:

```json
{
  "todo": {
    "task": "Buy milk",
    "description": "",
    "duedate": "",
    "status": 0
  }
}
```


## Local Development

Install dependencies:

```bash
npm install
```

Run backend:

```bash
npm run dev:server
```

Run frontend (new terminal):

```bash
npm run dev:client
```

Frontend dev server uses Vite proxy for `/api` -> `http://localhost:3000`.


