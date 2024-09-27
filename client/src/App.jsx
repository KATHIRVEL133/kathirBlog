import {Routes,Route,BrowserRouter} from 'react-router-dom'
import About from './pages/About.jsx'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Projects from './pages/Projects'
import SignUp from './pages/SignUp'
import Header from './components/Header.jsx'
import FooterComponent from './components/FooterComponent.jsx'
function App() 
{
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='sign-up' element={<SignUp/>}/>
    </Routes>
    <FooterComponent/>
    </BrowserRouter>
  )
}

export default App
