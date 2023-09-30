import Image from "next/image";
import {
  HomeIcon,
  LogOutIcon,
  MessageCircleIcon,
  PersonStandingIcon,
  SettingsIcon,
  TargetIcon,
  User2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  return <div>Hello wrold</div>;
}

const routes = [
  {
    label: "Home",
    icon: <HomeIcon size={18} />,
    pathname: "/",
  },
  {
    label: "Profile",
    icon: <User2Icon size={18} />,
    pathname: "/profile",
  },
  {
    label: "Session",
    icon: <TargetIcon size={18} />,
    pathname: "/session",
  },
  {
    label: "Feedback",
    icon: <MessageCircleIcon size={18} />,
    pathname: "/feedback",
  },
  {
    label: "Settings",
    icon: <SettingsIcon size={18} />,
    pathname: "/settings",
  },
];

function Sidebar() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-[280px] text-slate-800 h-screen shadow">
      <div className="flex h-20 items-center justify-center">
        <div>LOGO</div>
      </div>
      <ul className="flex flex-col gap-2">
        {routes.map((route, i) => {
          const isActive = router.pathname === route.pathname;
          return (
            <Link
              href={route.pathname}
              className={`mx-4  hover:bg-slate-100 flex gap-2 px-4 py-2 items-center cursor-pointer rounded ${
                isActive ? "bg-gray-200 font-semibold" : ""
              }`}
              key={route.label}
            >
              <i>{route.icon}</i>
              <span>{route.label}</span>
            </Link>
          );
        })}
      </ul>
      <div className="flex-1" />
      <div className="px-4 py-2 flex gap-2 items-center cursor-pointer">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/images/profile.png" />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
        <div className="overflow-hidden flex-1">
          <p>Prajwal Pradhan</p>
          <p className="text-sm truncate text-gray-500">prajwal@ramailo.tech</p>
        </div>
        <LogOutIcon size={18} />
      </div>
    </div>
  );
}
export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen `}>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <header className=" w-full px-4 py-4">
            <div className="flex flex-1 justify-between ">
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold">
                  Welcome back, Prajwal!!
                </h1>
                <p className="text-xs max-w-lg text-gray-500">
                  Join your next session, know what task to work on, get a total
                  overview of your goals and progress, all from here!
                </p>
              </div>
              <div className="flex">
                <Avatar>
                  <AvatarImage src="/images/profile.png" />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <section className="px-4 py-4">{children}</section>
        </main>
      </div>
    </div>
  );
}
