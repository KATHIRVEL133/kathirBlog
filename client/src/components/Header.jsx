/* eslint-disable react/no-unescaped-entities */
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link , useLocation,useNavigate} from "react-router-dom";
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentUser} = useSelector((state)=> state.user);
    const {theme} = useSelector((state)=>state.theme)
    const path = useLocation().pathname;
    const [searchTerm,setSearchTerm] = useState('');
    const location = useLocation();
    useEffect(()=>
    {
    const urlParams = new URLSearchParams(location.search);
    const searchterm = urlParams.get('searchTerm');
    if(searchterm) setSearchTerm(searchterm);
    },[location.search])
    const handleSignOut = async ()=>
        {
    
       try
       {
       const res = await fetch(`/api/user/signout`,{
        method:'POST'
       });
       const data = await res.json();
       if(!res.ok)
       {
        console.log(data);
       }
       else{
    
         dispatch(signOutSuccess(data));
       }
       }
       catch(error)
       {
        console.log(error);
       }
       }
       const handleSubmit = async (e)=>
       {
        e.preventDefault();
        const urlParams = new  URLSearchParams(location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
       }
  return (
    <Navbar className="border-b-2">
        <Link to={'/'} className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
         Kathir's 
        </span>
        Blog
        </Link>
        <form onSubmit={handleSubmit}>
        <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch} className="hidden lg:inline" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}>

        </TextInput>
        </form>
        <Button className="w-12 h-10 lg:hidden cursor-pointer" color='gray' pill>
            <AiOutlineSearch/>
        </Button>
        <div className="flex gap-2 md:order-2">
            <Button className="w-12 h-10 hidden sm:inline" color='gray' pill onClick={()=> dispatch(toggleTheme())}>
               {theme==='light'?<FaSun/> :<FaMoon/>}
            </Button>
            {
                currentUser?(<Dropdown
                 inline
                 arrowIcon={false}
                 label={
                    <Avatar
                      alt="user"
                      img={currentUser.profilePicture}
                      rounded
                     />
                 }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            @{currentUser.username}
                        </span>
                        <span className="block text-sm font-medium truncate">
                           {
                            currentUser.email
                           }
                        </span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item>
                        Profile
                    </Dropdown.Item>
                    </Link>
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={handleSignOut}>
                        Sign Out
                    </Dropdown.Item>
                </Dropdown>
               
            ):
            <Link to={'/sign-in'}>
            <Button gradientDuoTone='purpleToBlue' outline>
                Sign In
            </Button>
            </Link>
            }
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path==='/'} as={'div'}>
                <Link to='/'>
                    Home
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/about'} as={'div'}>
                <Link to='/about'>
                    About
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/projects'} as={'div'}>
                <Link to='/projects'>
                    Projects
                </Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
