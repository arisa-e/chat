import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Auth, SetAvatar, Chat, Signup, Login } from "./pages"


// const authToken=false

function App() {
  // if(!authToken)<Auth/>

  return (
    <div className="app__wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Chat/>}/>
          {/* <Route path="/auth" element={<Auth/>}/> */}
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path = "/setAvatar" element={<SetAvatar/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
