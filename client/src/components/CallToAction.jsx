import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
       <h2 className="text-2xl">
        Want to learn more about Javascript?
       </h2>
       <p className="text-gray-500 my-2">
        Checkout these resources with 100 JavaScript Projects
       </p>
       <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl rounded-bl-none">
        <a href="https://www.100jsprojects.com" target='_blank' rel="noopener noreferrer">
            100 javascript Projects
        </a>
       </Button>
      </div>
      <div className="p-7 flex-1">
       <img src="https://media.istockphoto.com/id/1284271878/photo/javascript-inscription-against-laptop-and-code-background-learn-javascript-programming.jpg?s=612x612&w=0&k=20&c=H9FI5X3ZBQIyEijvhJc-jv5McwCh-BxqQPxee9Aoa08=">
        
       </img>
      </div>
    </div>
  )
}
