## Live Chat
A barebones live chat app which lets you chat with one or more people. Since we
don't use cookies or local web storage, sessions are lost upon refresh.

### Tech
- [express](https://expressjs.com) for the web server &
[socket.io](https://socket.io) to use WebSockets for exchanging messages
- vanilla JS & [TailwindCSS](https://tailwindcss.com/) for the frontend UI
- [vite](https://vitejs.dev/), [nodemon](https://www.npmjs.com/package/nodemon) & [npm](https://www.npmjs.com/) as development
tools
- HTML, CSS, TS as the principal programming/markup languages

### Special lessons
- Using socket.io library for exchanging messages
- Using [cors](https://www.npmjs.com/package/cors) library to resolve CORS issues

### Directory structure & project architecture
- `src` contains the main source tree for the frontend, and `server` contains
the source for the backend.
- This project is architected as a barebones vanilla TypeScript web app.

### Future extensions with minimal effort
- Style the UI & make the web app responsive (this step requires non-trivial UI design decisions)
- Polish up the app a bit with better interactivity (for e.g., send upon `<Enter>`,  resetting the message input upon sending)
- Integrate with the
[chess_simulator](https://github.com/busywhistling/chess_simulator) app to create a
barebones chess server

### Build & run
```bash
git clone https://github.com/busywhistling/live_chat
cd live_chat
npm install
npm run dev # to run dev server for frontend
npm run start-server # in another terminal, to run express and socket.io servers
```
Open up the local deploy ([`http://localhost:5173`](http://localhost:5173)) on
two (or more) browser
windows, and chat among the windows.
