import {
  HomeIcon,
  LogOutIcon,
  MessageCircleIcon,
  SettingsIcon,
  TargetIcon,
  User2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/router";
import Link from "next/link";

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
    <div className="hidden lg:flex flex-col w-[280px] text-slate-800 h-screen shadow z-20 ">
      <div className="flex h-20 items-center justify-center">
        <div>LOGO</div>
      </div>
      <ul className="flex flex-col gap-2 ">
        {routes.map((route, i) => {
          const isActive = router.pathname === route.pathname;
          return (
            <Link
              href={route.pathname}
              className={`mx-4  hover:bg-slate-100 flex gap-2 px-4 py-2 items-center cursor-pointer rounded ${
                isActive ? "bg-gray-200  font-semibold" : ""
              }`}
              key={route.label}
            >
              {isActive && (
                <div className="w-1 h-[20px] bg-indigo-500 rounded" />
              )}
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
    <div className={`h-screen overflow-hidden`}>
      <div className="flex overflow-y-hidden">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-scroll">
          <header className=" w-full px-4 py-4 sticky top-0 bg-[#F1F1F188] z-10 backdrop-blur-md">
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
