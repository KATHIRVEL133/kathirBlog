import { Button, TextInput } from "flowbite-react"
import { useSelector } from "react-redux"
export default function DashBoardProfile() {
   const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className=" max-w-lg mx-auto w-full p-3">
      <h1 className="text-center my-10 font-semibold text-3xl">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
      <div className="w-36 h-36 rounded-full  self-center border border-8 border-[lightgray]">
        <img src={currentUser.profilePicture} className="w-full h-full object-cover rounded-full cursor-pointer"/>
      </div>
      <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username}/>
      <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email}/>
      <TextInput type="password" id="password" placeholder="password" />
      <Button type="submit" gradientDuoTone='purpleToBlue' outline>
        Update
      </Button>
      </form>
      <div className="flex justify-between text-red-500 mt-5 ">
        <span className="cursor-pointer">
            Delete Account
        </span>
        <span className="cursor-pointer">
            Sign Out
        </span>
      </div>
    </div>
  )
}
