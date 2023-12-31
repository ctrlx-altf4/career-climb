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
import useAuthStore from "@/lib/store/auth";
import { useEffect } from "react";
import { useUserControllerSelf } from "@/api/generated";
import Image from "next/image";
import ApplicantProfileForm from "@/components/pages/applicant/applicant-profile-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const routes = [
  {
    label: "Home",
    icon: <HomeIcon size={18} />,
    pathname: "/applicant/dashboard",
  },
  {
    label: "Profile",
    icon: <User2Icon size={18} />,
    pathname: "/applicant/profile",
  },
  {
    label: "Session",
    icon: <TargetIcon size={18} />,
    pathname: "/applicant/session",
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
  const { data: me } = useUserControllerSelf();

  const logout = useAuthStore((state) => state.logout);
  //TODO:
  if (!me) return null;
  return (
    <div className="hidden lg:flex flex-col w-[280px] text-slate-800 h-screen shadow z-20 ">
      <div className="flex h-20 items-center justify-center">
        <div>LOGO</div>
      </div>
      <ul className="flex flex-col gap-2 ">
        {routes.map((route) => {
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
          <AvatarImage src={me.image_url} />
          <AvatarFallback>
            {me.name
              .split(" ")
              ?.map((m) => m[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="overflow-hidden flex-1">
          <p>{me.name}</p>
          <p className="text-sm truncate text-gray-500">{me.email}</p>
        </div>
        <Dialog>
          <DialogTrigger>
            <LogOutIcon size={18} />
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>Are you sure you want to Logout?</DialogHeader>
            <div className="flex justify-end gap-4">
              <Button
                onClick={() => {
                  logout();
                  router.reload();
                }}
              >
                Logout
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const { data: me, isLoading } = useUserControllerSelf();

  useEffect(() => {
    //TODO: something when isLoggedIn ===null
    if (isLoggedIn === false) {
      void router.replace("/");
    }
  }, [isLoggedIn, router]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col  items-center justify-center">
        <div className="spinner-container">
          <Image
            src="/images/profile.png"
            width={28}
            height={28}
            alt="Google icon"
          />
        </div>
        <div className="mt-8 flex flex-col gap-1 justify-center text-center">
          <p>Successfully Logged in</p>
          <p>Now Redirecting to home page</p>
        </div>
      </div>
    );
  }
  if (!me?.hasProfile) {
    return (
      <div className="bg-gradient-to-t from-transparent pt-28 to-indigo-400 h-screen w-screen flex items-center justify-center">
        <div className=" max-w-lg bg-white shadow px-4   rounded-lg mx-auto py-5">
          <ApplicantProfileForm />
        </div>
      </div>
    );
  }
  if (isLoggedIn && me.role === "user")
    return (
      <div className={`h-screen overflow-hidden`}>
        <div className="flex overflow-y-hidden">
          <Sidebar />
          <main className="flex-1 h-screen overflow-y-scroll">
            <header className=" w-full px-4 py-4 sticky top-0 bg-[#F1F1F188] z-10 backdrop-blur-md">
              <div className="flex flex-1 justify-between ">
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-semibold">
                    Welcome back, {me?.name}!!
                  </h1>
                  <p className="text-xs max-w-lg text-gray-500">
                    Join your next session, know what task to work on, get a
                    total overview of your goals and progress, all from here!
                  </p>
                </div>
                <div className="flex">
                  <Avatar>
                    <AvatarImage src={me.image_url} />
                    <AvatarFallback>
                      {" "}
                      {me.name
                        .split(" ")
                        ?.map((m) => m[0])
                        .join("")}
                    </AvatarFallback>
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
