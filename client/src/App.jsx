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
import ScrollToTop from './components/ScrollToTop.jsx'
import DashBoardPosts from './components/DashBoardPosts.jsx'
import DashBoardComments from './components/DashBoardComments.jsx'
import DashBoardUsers from './components/DashBoardUsers.jsx'
import Search from './pages/Search.jsx'
function App() 
{
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
    <Routes>
      <Route path='/about' element={<About/>}></Route>
      <Route element={<PrivateRoute/>}> 
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard/postPage' element={<DashBoardPosts/>}/>
      <Route path='/dashboard/commentPage' element={<DashBoardComments/>}/>
      <Route path='/dashboard/userPage' element={<DashBoardUsers/>}/>
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
      <Route path='/search' element={<Search/>}/>
    </Routes>
    <FooterComponent/>
    </BrowserRouter>
  )
}

export default App
