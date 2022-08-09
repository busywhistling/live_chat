import './style.css'
import io from 'socket.io-client';

const socket = io('ws://localhost:6001')

let username = '', room = '', currentMessage = '', loggedIn = false;

document.querySelector<HTMLInputElement>('#username-input')?.addEventListener('change', function () {
    username = this.value;

});
document.querySelector<HTMLInputElement>('#room-input')?.addEventListener('change', function () {
    room = this.value;
    console.log('username: ', username, ' wants to join room', room)
});
document.querySelector<HTMLInputElement>('#current-message')?.addEventListener('change', function () {
    currentMessage = this.value;
});

console.log('username: ', username, ' wants to join room', room)

document.querySelector<HTMLButtonElement>('#button-input')?.addEventListener('click', joinRoom)

function joinRoom() {
    if (username !== '' && room !== '') {

        socket.emit("join_room", room)
        document.querySelector<HTMLDivElement>('#login-info')!.innerHTML = `
<p>You are now logged in as <strong>${username}</strong> in room <strong>${room}</strong></p>
`
        loggedIn = true
    }
}

document.querySelector<HTMLButtonElement>('#button-send-message')?.addEventListener('click', sendMessage)

async function sendMessage() {
    if (!loggedIn)
        return
    if (currentMessage !== "") {
        const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
        }
        socket.emit('send_message', messageData);
        messageList.push(`<p>${messageData.author} (${messageData.time}): ${messageData.message}</p>`)
        showMessages();

    }
}

interface dataType {
    room: string
    author: string
    message: string
    time: string
}

socket.on('receive_message', (data: dataType) => {
    console.log(data)
    messageList.push(`<p>${data.author} (${data.time}): ${data.message}</p>`)
    showMessages();
})

let messageList: string[] = []

function showMessages() {
    document.querySelector<HTMLDivElement>('#chat-body')!.innerHTML = messageList.join('\n');
    let objDiv = document.querySelector<HTMLDivElement>("#chat-body")!;
    objDiv.scrollTop = objDiv.scrollHeight;
}