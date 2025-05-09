import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { userContext } from "../context/userContext";

const socket = io("http://localhost:3001", { transports: ['websocket'] });

const LiveChat = () => {
    const { user } = useContext(userContext);
    const { tournamentId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        socket.on("newMessage", (msg) => {
            console.log("📩 New message received:", msg);
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off("newMessage");
    }, []);

    const sendMessage = () => {
        if (newMessage.trim() !== "" && user) {
            console.log("📤 Sending message:", newMessage);
            socket.emit("sendMessage", {
                tournamentId,
                message: newMessage,
                username: user.displayName,
                picture: user.picture,
            });
            setNewMessage("");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Live Chat for Tournament {tournamentId}</h2>
            <div style={styles.chatBox}>
                {messages.map((msg, index) => (
                    <div key={index} style={msg.username === user?.displayName ? styles.myMessage : styles.otherMessage}>
                        <img
                            src={msg.picture || "default-avatar.png"}
                            alt="Profile"
                            style={styles.profilePic}
                        />
                        <strong>{msg.username}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <button onClick={sendMessage} style={styles.button}>Send</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "500px",
        margin: "auto",
    },
    chatBox: {
        width: "100%",
        height: "300px",
        border: "1px solid #ccc",
        padding: "10px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    myMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#dcf8c6",
        padding: "5px 10px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    otherMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#f1f1f1",
        padding: "5px 10px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    profilePic: {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
    },
    inputContainer: {
        display: "flex",
        width: "100%",
        marginTop: "10px",
    },
    input: {
        flex: 1,
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
    },
    button: {
        marginLeft: "5px",
        padding: "10px",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
        borderRadius: "5px",
    },
};

export default LiveChat;
