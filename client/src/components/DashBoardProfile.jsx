/* eslint-disable no-unused-vars */
import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
export default function DashBoardProfile() {
   const {currentUser} = useSelector((state)=>state.user)
   const [imageFile,setImageFile] = useState(null);
   const [imageFileURL,setImageFileURL] = useState(null);
   const filePickerRef = useRef(null);
   const [imageUploadProgress,setImageUploadProgress] = useState(0);
   const [imageUploadError,setImageUploadError] = useState(null); 
  
   const handleImageChange = (e)=>
   {
   const file = e.target.files[0];
   if(file)
   {
    setImageFile(file);
    setImageFileURL(URL.createObjectURL(file));

   }
   }
   useEffect(()=>{
        if(imageFile)
        {
          uploadImage();
        }
   },[imageFile])
   const uploadImage = async ()=>
   {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if 
    //       request.resource.size<2*1024*1024 && 
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,imageFile);
    uploadTask.on('state_changed',(snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setImageUploadProgress(progress.toFixed(0));
    },(error)=>{
      setImageUploadError('Could not upload image (File must be less than 2MB)');
      setImageUploadProgress(null);
      setImageFile(null);
      setImageFileURL(null); 
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImageFileURL(downloadURL);
      })
    }
  )
   }
  return (
    <div className=" max-w-lg mx-auto  p-3 w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">
        Profile
      </h1>
      <form className="flex flex-col gap-6 ">
        <input type="file" accept="image/*" hidden  onChange={handleImageChange} ref={filePickerRef}>
        </input>
      <div className=" relative w-32 h-32 rounded-full overflow-hidden shadow-md self-center cursor-pointer" onClick={()=>filePickerRef.current.click()}>
      {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
        <img src={imageFileURL||currentUser.profilePicture} className={`w-full h-full object-cover rounded-full   border-8 border-[lightgray] ${imageUploadProgress&&imageUploadProgress<100&&'opacity-60'}`}/>
       
      </div>
      {
        imageUploadError&& <Alert color='failure'>{imageUploadError}</Alert>
      }
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
