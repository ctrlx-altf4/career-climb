import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuthStore from "@/lib/store/auth";
import {
  useUserControllerChangeUserRole,
  useUserControllerSelf,
} from "@/api/generated";
import { headers } from "next/headers";

function Success() {
  const router = useRouter();

  const { addToken, accessToken } = useAuthStore();

  const { data: me, isLoading } = useUserControllerSelf({
    query: {
      enabled: !!accessToken,
    },
  });

  const { mutateAsync: changeUserRole } = useUserControllerChangeUserRole();

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const accessToken = queryParameters.get("access_token");

    if (accessToken) {
      addToken(accessToken);
    }
  }, [addToken]);

  // TODO: redo this logic from backend
  useEffect(() => {
    if (me?.id) {
      if (me.hasProfile) {
        if (me?.role === "user") {
          void router.replace("/applicant/dashboard");
        } else {
          void router.replace("/interviewer/dashboard");
        }
      } else {
        const isCandidate = localStorage.getItem("isCandidate");
        if (isCandidate === "true") {
          void router.replace("/applicant/dashboard");
        } else {
          changeUserRole({
            data: {
              role: "interviewer",
            },
          }).then((res) => {
            void router.replace("/interviewer/dashboard");
          });
        }
      }
    }
  }, [me?.id, me?.hasProfile, me?.role, router]);
  return (
    <div className="h-screen w-screen flex flex-col  items-center justify-center">
      <div className="spinner-container">
        <Image
          src="/images/google.png"
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

export default Success;
