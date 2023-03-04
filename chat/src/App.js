import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import { useState, useEffect } from 'react';

//listen  events 
const socket = io('http://localhost:4000')

function App() {
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [disabled, setDisabled] = useState('false')
  const [messages, setMessages] = useState([])

  const [storedMessages, setStoredMessages] = useState([])
  const [firtTime, setFirtTime] = useState(false)

  const url = 'http://localhost:4000/api/'
  useEffect(() => {
    const messageReceved = (message) => {
      setMessages([message, ...messages])
    }

    socket.on('message', messageReceved)
    return () => {
      socket.off('message', messageReceved)
    }

  }, [messages])

  if (!firtTime) {
    axios.get(url + "messages").then(res => {
      setStoredMessages(res.data.messages)
    })
    setFirtTime(true)
  }


  const nicknameSubmit = (e) => {
    e.preventDefault()
    setNickname(nickname)
    setDisabled(true)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (nickname !== '') {
      socket.emit('message', message, nickname)

      const newMessage = {
        body: message,
        from: 'I Am'
      }
      setMessages([newMessage, ...messages])
      setMessage('')

      //axios http POST to save message
      axios.post(url + 'save', {
        message: message,
        from: nickname
      })
    } else {
      alert('To send a message should add a nickname')
    }
  }

  return (
    <div className="App">
      <div className='container mt-3'>

        <div className="card shadow border-0">
          <div className='card-body'>
            <h5 className="text-center">CHAT KUEPA</h5>

            {/*use*/}
            <form onSubmit={nicknameSubmit}>
              <div className="d-flex mb-3">
                <input type="text" className='form-control' id="nickname" placeholder="Nickname..." onChange={e => setNickname(e.target.value)} value={nickname} required />
                <button className="btn btn-success mx-3" type="submit" id="btn-nickname" >Add</button>
              </div>
            </form>

            {/*chat User*/}
            <form onSubmit={submitHandler}>
              <div className="d-flex">
                <input type="text" className='form-control' placeholder='Message...' id="message" onChange={e => setMessage(e.target.value)} value={message} />
                <button className="btn btn-success mx-3" type="submit" id="btn-message">Send</button>
              </div>
            </form>
          </div>
        </div>

        {/*chat Messages*/}
        <div className='card mt-3 mb-3 shadow border-0' id="content-chat">
          <div className='card-body'>

            {messages && messages.map((message, index) => (
              <div key={index} className={`d-flex p-3 ${message.from === "I Am" ? "justify-content-end" : "justify-content-start"}`}>
                <div className={`card mb-3 shadow border-1${message.from === "I Am" ? "bg-success bg-opacity-25" : "bg-ligth"}`}>
                  <div className='card-body'>
                    <small className=''>{message.from}:{message.body}</small>
                  </div>
                </div>
              </div>
            ))}
            {/*chat stored Messages*/}
            <small small className='text-center text-muted' >...Messagges saved...</small>
            {storedMessages && storedMessages.map((message, index) => (
              <div key={index} className={`d-flex p-3 ${message.from === nickname ? "justify-content-end" : "justify-content-start"}`}>
                <div className={`card mb-3 shadow border-1 ${message.from === nickname ? "bg-success bg-opacity-25" : "bg-ligth"}`}>
                  <div className='card-body'>
                    <small className='text-muted'>{message.from}:{message.message}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

}

export default App;
