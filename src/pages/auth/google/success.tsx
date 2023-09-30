import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuthStore from "@/lib/store/auth";

function Success() {
  const router = useRouter();

  const addToken = useAuthStore((state) => state.addToken);

  useEffect(() => {
    // Get the query parameters from the URL
    const queryParameters = new URLSearchParams(window.location.search);

    // Get the value of the "access_token" parameter
    const accessToken = queryParameters.get("access_token");

    if (accessToken) {
      // You can do whatever you need with the access token here
      addToken(accessToken);
      const isCandidate = localStorage.getItem("isCandidate");
      console.log("IsCandidate", Boolean(isCandidate));
      void router.replace("/applicant/dashboard");
    } else {
      //TODO: do something here
    }
  }, []);

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
