import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import WebRouter from './router';
function App() {
  library.add(fas)
  return (
    <div className="App">
          <WebRouter/>
    </div>
  );
}

export default App;
