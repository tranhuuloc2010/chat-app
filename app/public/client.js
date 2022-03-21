
const socket = io();
const acknowledgements = (err) => {
    if (err) {
        alert(err)
        return
    }
    console.log('send success')
}
console.log('run')

document.getElementById('form-messages').addEventListener('submit', ()  => {
    event.preventDefault()
    const messages = document.getElementById('input-messages').value
    socket.emit('send-message-client-to-server', messages, acknowledgements)
})

// nhan message tu server

socket.on('send-message-server-to-client', (messages) => {
    console.log(messages)
})
