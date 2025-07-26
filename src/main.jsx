import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { rootReducer } from './components/redux/reducers/index.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(rootReducer);

createRoot(document.getElementById('root')).render(<Provider store={store}><App /></Provider>)
