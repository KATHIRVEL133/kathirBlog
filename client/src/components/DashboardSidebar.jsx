import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {HiArrowSmRight, HiDocumentText, HiUser} from "react-icons/hi"
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch,useSelector } from "react-redux";
export default function DashboardSidebar() {
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state)=> state.user );
    const location = useLocation();
    const [tab,setTab] = useState('');
    console.log(tab);
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if(tabFromUrl)
      setTab(tabFromUrl);
    },[location.search]);
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
  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col gap-1">
                <Link to={'/dashboard?tab=profile'}>
                <Sidebar.Item  active={tab==='profile'} icon={HiUser} label={currentUser.isAdmin?'Admin':'User'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                </Link>
                {
                  currentUser.isAdmin&&
                  <Link to={'/dashboard?tab=posts'}>
                   <Sidebar.Item active={tab==='posts'} icon={HiDocumentText}>
                    Posts
                   </Sidebar.Item>
                  </Link>
                }
                <Sidebar.Item onClick={handleSignOut} icon={HiArrowSmRight} className='cursor-pointer'>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
