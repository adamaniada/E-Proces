const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const SimplePeer = require('simple-peer');

dotenv.config();


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Middleware to parse JSON in request body
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour les fichiers statiques (CSS, images, etc.)
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use("/assets", express.static("assets"));

const welcomeRouter = require('./routes/welcome.router');
const registerRouter = require("./routes/register.router");
const loginRouter = require("./routes/login.router");
const refreshRouter = require("./routes/refresh.router");
const homeRouter = require("./routes/home.router");
const callRouter = require("./routes/call.router");
const privacyRouter = require("./routes/privacy.router");
const contactRouter = require("./routes/contact.router");
const aboutRouter = require("./routes/about.router");
const faqRouter = require("./routes/faq.router");
const logoutRouter = require("./routes/logout.router");

const usersRoutes = require('./routes/usersRoutes');

// Utilisez le fichier de routes d'erreurs
const errorsRoutes = require("./routes/errors.router");

const authMiddleware = require('./middleware/authMiddleware');

app.use('/', welcomeRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/api/refresh", refreshRouter);
app.use("/home", homeRouter);
app.use("/call", callRouter);
app.use("/privacy", privacyRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);
app.use("/faq", faqRouter);
app.use("/logout", logoutRouter);

// Use the user routes with the new base path '/users'
app.use('/users', usersRoutes);

app.use(errorsRoutes);

// Correct: Declare peers outside any functions
let peers = {};

// Gestion de la signalisation et des connexions WebRTC
io.on('connection', (socket) => {
    console.log('Nouvelle connexion :', socket.id);

    // Gérer l'événement de demande de connexion vidéo
    socket.on('call', (data) => {
        // Diffuser l'événement à tous les clients sauf l'émetteur
        socket.broadcast.emit('incomingCall', data);
    });

    // Gérer l'événement 'initiate-call' côté serveur
    socket.on('initiate-call', (data) => {
        console.log(`Utilisateur ${data.username} a initié un appel dans la salle ${data.room}`);
        
        // Diffuser un événement à tous les utilisateurs dans la salle
        io.to(data.room).emit('call-initiated', { initiator: data.username });
    });

    // Gérer l'événement de réponse à l'appel
    socket.on('answerCall', (data) => {
        // Diffuser l'événement à tous les clients sauf l'émetteur
        socket.broadcast.emit('callAnswered', data);
    });

    // Gérer l'événement de rejoindre une salle
    socket.on('join-room', (data) => {
        // Joindre la salle spécifiée
        socket.join(data.room);
        // Diffuser un message à tous les clients dans la salle
        io.to(data.room).emit('user-joined', { username: data.username, room: data.room });
    });

    // Handle signaling for video calls
    socket.on('initiateCall', (data) => {
        console.log('Initiate Call Event Received:', data.targetUserId);

        // Create a new SimplePeer instance for the caller with the wrtc option
        const peer = new SimplePeer({ initiator: true, wrtc: require('wrtc') });

        // Save the peer instance in a dictionary or some data structure for future reference
        // Assuming you have a global variable named 'peers'
        peers[data.targetUserId] = peer;

        // Send the signaling data to the callee
        io.to(data.targetUserId).emit('receiveCall', { signal: peer.signal });

        // Listen for signaling data from the callee
        socket.on('answerCall', (answerData) => {
            // Retrieve the peer instance for the caller
            const callerPeer = peers[data.targetUserId];

            // Check if the callerPeer is available
            if (callerPeer) {
                callerPeer.signal(answerData.signal);
            }
        });

        // Listen for data channel messages
        peer.on('data', (receivedData) => {
            console.log('Received data:', receivedData.toString());
            // Handle data received from the other peer
        });

        // Add the peer to the room for future communication
        io.to(data.targetUserId).emit('addToRoom', socket.id);
    });

    // Gérer l'événement 'endCall' côté serveur
    socket.on('endCall', (data) => {
        // Get the target user ID from the data
        const targetUserId = data.targetUserId;

        // Check if the target user ID is valid
        if (peers[targetUserId]) {
            // Retrieve the peer instance for the target user
            const targetPeer = peers[targetUserId];

            // Close the peer connection
            targetPeer.destroy();

            // Remove the peer instance from the dictionary or data structure
            delete peers[targetUserId];

            // Emit an event to inform the target user that the call has ended
            io.to(targetUserId).emit('callEnded', { initiator: socket.id });

            console.log(`Call ended by ${socket.id} for user ${targetUserId}`);
        } else {
            // Handle the case where the target user ID is not valid or the peer instance is not found
            console.error(`Invalid target user ID or peer instance not found for user ${targetUserId}`);
        }
    });

    // Gérer la déconnexion
    socket.on('disconnect', () => {
        console.log('Déconnexion :', socket.id);

        // Clean up resources, remove the disconnected user's peer instance, etc.
        // Assuming you have a global variable named 'peers'
        delete peers[socket.id];
    });
});

const startServer = (port) => {
    try {
        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
        });
    } catch (error) {
        console.error(error);
        process.exit();
    }
};

const PORT = process.env.PORT || 3000;
startServer(PORT);
