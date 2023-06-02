import { useState, useEffect } from "react"
import io from "socket.io-client"
import "./App.css"





function App() {
    const [socket] = useState(() => io(":8000"))
    const [message, setMessage] = useState("")
    const [messageReceived, setMessageReceived] = useState("")
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        console.log("Is this running?")
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message)
            setMessageList([...messageList, data.message])
        })
    }, [socket])

    const sendMessage = (e) => {
        socket.emit("send_message", { message })
    }

    return (
        <div className="App">
            <h1 className = "display-3 text-info">Socket Test</h1>
            <div id = "my-form">
                <label className = "text text-secondary mb-3">Type the message you want to send:</label>
                <input onChange = {(e) => setMessage(e.target.value)} type = "text" placeholder = "Message..." className = "form-control"/>
                <button onClick = {sendMessage}  className = "btn btn-outline-info mt-4" id = "send-button">Send Message</button>
            </div>
            <p className = "text-light">{messageReceived}</p>
        </div>
    );
}

export default App;
