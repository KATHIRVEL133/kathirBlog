/* eslint-disable react/no-unescaped-entities */
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter} from "react-icons/bs"
export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-8xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
         <div className="mt-5">
        <Link to={'/'} className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
         Kathir's 
        </span>
        Blog
        </Link>
        </div>
        <div className="grid gap-8 grid-cols-2  mt-6 sm:grid-cols-3 sm:gap-6">
        <div>
            <Footer.Title title="About"/>
            <Footer.LinkGroup col>
            <Footer.Link 
             href='https://www.100jsprojects.com'
             target="_blank"
             rel="noopener noreferrer"
            >
                100js Projects
            </Footer.Link>
            <Footer.Link 
             href='/about'
             target="_blank"
             rel="noopener noreferrer"
            >
                Kathir's Blog
            </Footer.Link>
    
            </Footer.LinkGroup>
        </div>
        <div>
            <Footer.Title title="FOLLOW US"/>
            <Footer.LinkGroup col>
                <Footer.Link
                href="https://github.com/KATHIRVEL133/kathirBlog"
                target="_blank"
                rel="noopener noreferrer"
                >
                    Github
                </Footer.Link>
                <Footer.Link
                 href="https://www.linkedin.com/in/kathirvelsundarasamy/"
                 target="_blank"
                 rel="noopener noreferrer"
                >
                    LinkedIn
                </Footer.Link>
            </Footer.LinkGroup>
        </div>
        <div>
            <Footer.Title title="LEGAL"/>
            <Footer.LinkGroup col>
             <Footer.Link>
                Privacy Policy
             </Footer.Link>
             <Footer.Link>
                Terms&Conditions
             </Footer.Link>
            </Footer.LinkGroup>
        </div>
        </div>
        </div>
        <Footer.Divider className="w-full"/>
        <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-2 ">
         <Footer.Copyright href="#" by="Kathirvel" year={new Date().getFullYear()}/>
         <div className="flex gap-3">
         <Footer.Icon href='#' icon={BsFacebook}/>
         <Footer.Icon href='#' icon={BsInstagram}/>
         <Footer.Icon href='#' icon={BsGithub}/>
         <Footer.Icon href='#' icon={BsTwitter}/>
         <Footer.Icon href='#' icon={BsDribbble}/>
         </div> 
        </div>
      </div>
    </Footer>
  )
}
