/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashBoardProfile";
import DashBoardPosts from "../components/DashBoardPosts";
import DashBoardUsers from "../components/DashBoardUsers";
import DashBoardComments from "../components/DashBoardComments";
import DashBoardComp from "../components/DashBoardComp";
export default function Dashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('');
  console.log(tab);
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl)
    setTab(tabFromUrl);
  },[location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* leftSidebar */}
      <div className="md:w-56">
        <DashboardSidebar/>
      </div>
      {
        tab==='profile'&&<DashboardProfile/>
      }
      {
        tab==='posts'&&<DashBoardPosts/>
      }
      {
        tab==='users'&&<DashBoardUsers/>
      }
      {
        tab==='comments'&&<DashBoardComments/>
      }
      {
        tab==='dash'&&<DashBoardComp/>
      }
    </div>
  )
}
