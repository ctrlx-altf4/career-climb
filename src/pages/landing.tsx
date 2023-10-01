import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const testimonials = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    quote:
      "This app has been a game-changer for my career growth. It helped me showcase my work and connect with like-minded professionals.",
    image: "/images/profile.png", // Image file in the public directory
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    quote:
      "This app has been a game-changer for my career growth. It helped me showcase my work and connect with like-minded professionals.",
    image: "/images/profile.png", // Image file in the public directory
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    quote:
      "This app has been a game-changer for my career growth. It helped me showcase my work and connect with like-minded professionals.",
    image: "/images/profile.png", // Image file in the public directory
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="p-4 border rounded-md border-gray-200  shadow-lg"
        >
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={100}
            height={100}
            className="w-16 h-16 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-sm mb-4">{testimonial.email}</p>
          <blockquote className="text-lg font-medium text-gray-800">
            {testimonial.quote}
          </blockquote>
          <p className="text-gray-600 text-sm mt-4">{testimonial.name}</p>
        </div>
      ))}
    </div>
  );
};

export default function Component() {
  return (
    <div className="bg-gradient-to-t from-transparent to-indigo-400">
      <nav className="py-4  w-full ">
        <div className="container mx-auto flex items-center justify-between w-full">
          <div className="flex items-center">
            <a href="#" className="text-white text-2xl font-bold">
              Career Climb
            </a>
          </div>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="text-white text-xl">
                  <MenuIcon />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Home</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>About</DropdownMenuItem>
                <DropdownMenuItem>Services</DropdownMenuItem>
                <DropdownMenuItem>Contact</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex `}>
            <ul className="md:flex space-x-4 mt-4 md:mt-0">
              <li>
                <a href="#" className="text-white hover:text-blue-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-400">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 ">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="space-y-8">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-white bg-gradient-to-r from-black to-indigo-200">
                  Looking for a new Career change?
                </h1>
                <p className="max-w-[600px] text-white md:text-xl dark:text-zinc-100 mx-auto">
                  Join us and explore our experts, book an interview session
                  with our industry experts.
                </p>
              </div>
              <div className="w-full  space-y-2 mx-auto">
                <JoinUs />

                <p className="text-xs text-zinc-200 dark:text-zinc-100">
                  Get ready to redefine your interview experience.
                  <Link
                    className="underline underline-offset-2 text-white"
                    href="#"
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                  Discover Our Unique Features
                </h1>
                <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto">
                  Our features are designed to enhance your productivity and
                  streamline your workflow.
                </p>
              </div>
              <div className="w-full max-w-full space-y-4 mx-auto">
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Smart Inbox
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                      Our Smart Inbox feature helps you manage your emails
                      efficiently by prioritizing important emails.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m8 6 4-4 4 4" />
                        <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                        <path d="m20 22-5-5" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Seamless Integration
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                      Seamless Integration allows you to connect with your
                      favorite apps and services without leaving your inbox.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Advanced Customization
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                      With Advanced Customization, you can personalize your
                      email client to suit your preferences and work style.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Powerful Search
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                      Our Powerful Search feature allows you to find any email,
                      contact, or file in seconds.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          height="11"
                          rx="2"
                          ry="2"
                          width="18"
                          x="3"
                          y="11"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Reliable Security
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                      With Reliable Security, your data is always safe and
                      protected.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m8 6 4-4 4 4" />
                        <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                        <path d="m20 22-5-5" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Easy Collaboration
                    </h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                      Easy Collaboration allows you to share and edit documents
                      with your team in real time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 ">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center mb-8">
            User Testimonials
          </h1>
          <Testimonials />
        </div>
      </section>
      <div className="max-w-4xl mx-auto p-8"></div>
    </div>
  );
}

function JoinUs() {
  const [isCandidate, setIsCandidate] = useState(true);
  return (
    <Dialog>
      <DialogTrigger className="text-sm font-medium rounded-md  h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
        Join Now
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>What do you want to join as?</DialogTitle>
        </DialogHeader>

        <DialogDescription className=" ">
          <div className="flex gap-4 pt-4">
            <div
              className={` border rounded cursor-pointer w-full py-4 text-slate-800 px-4 hover:border-indigo-500  relative ${
                isCandidate ? "border-indigo-500" : "border"
              }`}
              onClick={() => setIsCandidate(true)}
            >
              <div
                className={`border-2 rounded   left-2 absolute  ${
                  isCandidate ? "border-indigo-500" : "border-gray-600"
                }`}
              >
                <div
                  className={`rounded w-4 h-4 m-1  ${
                    isCandidate ? "bg-indigo-500" : "bg-gray-600"
                  }`}
                />
              </div>
              <p className="text-lg font-medium text-center">As a Candidate</p>
              <p className="text-center mt-4">
                Explore and select experts in field where you want to excel.
                Interview with them and build up confidence. Redefine your
                interview experience.
              </p>
            </div>
            <div
              className={` cursor-pointer rounded border-2 text-slate-800  w-full py-4 px-4 relative ${
                !isCandidate ? "border-indigo-500" : "border"
              }`}
              onClick={() => setIsCandidate(false)}
            >
              <div
                className={`border-2  rounded  left-2 absolute  ${
                  !isCandidate ? "border-indigo-500" : "border-gray-600"
                }`}
              >
                <div
                  className={`rounded w-4 h-4 m-1  ${
                    !isCandidate ? "bg-indigo-500" : "bg-gray-600"
                  }`}
                />
              </div>
              <p className="text-lg font-medium text-center text-slate-800">
                As an Interviewer
              </p>
              <p className="text-center mt-4">
                Get Paid to interview candidates as per your skills. You need to
                be skilled in order for candidates to select you. You can set
                your own rate for interview.
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button className="">Lets go</Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
