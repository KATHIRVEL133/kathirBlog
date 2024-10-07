import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold my-7">
        Create a Post
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
       <TextInput type="text" placeholder="Title" required id="title" className="flex-1">

       </TextInput>
       <Select>
        <option value="uncategorized">
          Select a category
        </option>
        <option value="javascript">
          JavaScript
        </option>
        <option value="reactjs">
            ReactJs
        </option>
        <option value="nodejs">
             Node Js
        </option>
       </Select>
        </div>
        <div className="flex p-3 border-4 gap-4 justify-between border-teal-500 border-dotted">
         <FileInput type='file' accept="image/*"/>
         <Button type="button" gradientDuoTone="purpleToBlue" size='sm' outline>Upload Image</Button>
        </div>
        <ReactQuill theme="snow" placeholder="write something..." className="h-72 mb-12" id="content" required/>
        <Button type="submit" gradientDuoTone='purpleToPink'>
            Publish
        </Button>
      </form>
    </div>
  )
}
