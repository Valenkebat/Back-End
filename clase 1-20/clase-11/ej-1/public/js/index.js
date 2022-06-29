const socket = io.connect();

socket.on('mi mensaje', data => {
    document.querySelector('p').innerHTML += data 
} )