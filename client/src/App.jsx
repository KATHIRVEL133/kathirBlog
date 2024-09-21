import {Routes,Route,BrowserRouter} from 'react-router-dom'
import About from './pages/About.jsx'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Projects from './pages/Projects'
import SignUp from './pages/SignUp'
function App() 
{
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='sign-up' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
