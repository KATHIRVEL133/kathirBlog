/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Alert, Button, Modal, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateFailure, updateStart, updateSuccess } from "../redux/user/userSlice.js";
import {HiOutlineExclamationCircle} from 'react-icons/hi'
export default function DashBoardProfile() {
   const dispatch = useDispatch();
   const {currentUser,loading,error} = useSelector((state)=>state.user)
   const [imageFile,setImageFile] = useState(null);
   const [imageFileURL,setImageFileURL] = useState(null);
   const filePickerRef = useRef(null);
   const [imageUploadProgress,setImageUploadProgress] = useState(0);
   const [imageUploadError,setImageUploadError] = useState(null); 
   const [formData,setFormData] = useState({});
  const [updateUserSuccess,setUserUpdateSuccess] = useState('');
  const [showModal,setShowModal] = useState(false);
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
        setFormData({...formData,profilePicture:downloadURL});
      })
    }
  )
   }
   const handleChange = (e)=>
   {
    setFormData({...formData,[e.target.id]:e.target.value});
   }
   const handleSubmit = async (e)=> 
   {
    e.preventDefault();
    if(Object.keys(formData).length===0) return ;
    try
    {
    dispatch(updateStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`,{
     method:'put',
     headers:{
      'Content-Type':'application/json'
     },
     body:JSON.stringify(formData)
    });
    const data = await res.json();
    console.log(data);
    if(!res.ok)
    {
    
      dispatch(updateFailure(data.message));
      return ;
    }
    dispatch(updateSuccess(data));
    setUserUpdateSuccess('User updated Successfully');
    }
    catch(error)
    {
      dispatch(updateFailure(error));
    }
   }
   const handleDeleteUser = async (e)=>
   {
    setShowModal(false);
    e.preventDefault();
    try
    {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
    });
    const data = await res.json();
    if(!res.ok)
    {
      dispatch(deleteUserFailure(data.message));
    }
    else
    {
      dispatch(deleteUserSuccess(data));
    }
    }
    catch(error)
    {
      dispatch(deleteUserFailure(error));
    }
   }
  return (
    <div className=" max-w-lg mx-auto  p-3 w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
        <input type="file" accept="image/*" hidden  onChange={handleImageChange} ref={filePickerRef}>
        </input>
      <div className=" relative w-32 h-32 rounded-full overflow-hidden shadow-md self-center cursor-pointer" onClick={()=>filePickerRef.current.click()}>
        <img src={imageFileURL||currentUser.profilePicture} className={`w-full h-full object-cover rounded-full   border-8 border-[lightgray] ${imageUploadProgress&&imageUploadProgress<100&&'opacity-60'}`}/>
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
       
      </div>
      {
        imageUploadError&& <Alert color='failure'>{imageUploadError}</Alert>
      }
      <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} onChange={handleChange} />
      <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email} onChange={handleChange}/>
      <TextInput type="password" id="password" placeholder="password" onChange={handleChange} />
      <Button disabled={loading}  type="submit" gradientDuoTone='purpleToBlue' outline>
        {loading?'Updating':'Update'}
      </Button>
      {
        error&&<Alert color='failure'>
          {error}
        </Alert>
      }
      {
        updateUserSuccess&&<Alert color='success'>
          {updateUserSuccess}
        </Alert>
      }
      </form>
      <div className="flex justify-between text-red-500 mt-5 ">
        <span onClick={()=> setShowModal(true)} className="cursor-pointer">
            Delete Account
        </span>
        <span className="cursor-pointer">
            Sign Out
        </span>
      </div>
      {
        showModal&&
        <Modal show={showModal} popup onClose={()=>setShowModal(false)} size='md'>
        <Modal.Header/>
        <Modal.Body>
         <div className="text-center">
         <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200  mb-4 mx-auto"/>
         <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
          Are you sure you want to delete your account?
         </h3>
         <div className="flex justify-between"> 
         <Button color='failure' onClick={handleDeleteUser}> 
          Yes,I'm Sure
         </Button>
         <Button onClick={()=>setShowModal(false)} color='success'>
          No,Cancel
         </Button>
         </div>
         </div>
        </Modal.Body>
        </Modal>
      }
    </div>
  )
}
