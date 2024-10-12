import {Routes,Route,BrowserRouter} from 'react-router-dom'
import About from './pages/About.jsx'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Projects from './pages/Projects'
import SignUp from './pages/SignUp'
import Header from './components/Header.jsx'
import FooterComponent from './components/FooterComponent.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute.jsx'
import CreatePost from './pages/CreatePost.jsx'
import UpdatePost from './pages/UpdatePost.jsx'
import PostPage from './pages/PostPage.jsx'
function App() 
{
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/about' element={<About/>}></Route>
      <Route element={<PrivateRoute/>}> 
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
      <Route element={<OnlyAdminPrivateRoute/>}>
      <Route path='/create-post' element={<CreatePost/>}></Route>
      <Route path='/update-post/:postId' element={<UpdatePost/>}></Route>
      </Route>
      <Route path='/' element={<Home/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='sign-up' element={<SignUp/>}/>
      <Route path='/post/:postSlug' element={<PostPage/>}></Route>
    </Routes>
    <FooterComponent/>
    </BrowserRouter>
  )
}

export default App
