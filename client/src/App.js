import './App.scss';
import { Auth } from "./pages"


const authToken=false

function App() {
  if(!authToken)<Auth/>

  return (
    <div className="app__wrapper">
      <Auth/>
    </div>
  );
}

export default App;
