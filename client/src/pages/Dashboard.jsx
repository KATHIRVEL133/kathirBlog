/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashBoardProfile";
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
    </div>
  )
}
