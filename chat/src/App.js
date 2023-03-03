import './App.css';
import io from 'socket.io-client';
import axios from 'axios';

//listen  events 
const socket = io('http://localhost:4000')

function App() {
  return (
    <div className="App">
      <div className='container mt-3'>
        <div className='card'>
          <div className='card-body'>
            <h5 className="text-center">CHAT KUEPA</h5>

            {/*use*/}
            <form>
              <div className="d-flex mb-3">
                <input type="text" className='form-control' placeholder='Usuario...' id="usuario" />
                <button className="btn btn-success mx-3" type="submit" id="btn-usuario">Add</button>
              </div>
            </form>

            {/*chat User*/}
            <form>
              <div className="d-flex">
                <input type="text" className='form-control' placeholder='Message...' id="message" />
                <button className="btn btn-success mx-3" type="submit" id="btn-message">Send</button>
              </div>
            </form>

            {/*chat Messages*/}

          </div>
        </div>
        <div className='card mt-3 mb-3' id="content-chats">
          <div className='card-body'>

          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
