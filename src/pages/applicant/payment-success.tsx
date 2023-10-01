import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  getInterviewControllerGetApplicantInterviewQueryKey,
  useApplicantControllerGetProfile,
  useInterviewControllerCheckPayment,
  useUserControllerSelf,
} from "@/api/generated";
import { useQueryClient } from "@tanstack/react-query";

function Success() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: me } = useUserControllerSelf();

  // so fucked up
  const { data: applicant } = useApplicantControllerGetProfile(String(me?.id));

  const { mutateAsync: checkPayment } = useInterviewControllerCheckPayment();
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);

    const purchaseOrderId = queryParameters.get("purchase_order_id");
    const pidx = queryParameters.get("pidx");

    if (pidx && purchaseOrderId) {
      checkPayment({
        data: {
          pidx,
          session_id: Number(purchaseOrderId),
        },
      }).finally(async () => {
        await queryClient.invalidateQueries({
          queryKey: getInterviewControllerGetApplicantInterviewQueryKey(
            String(applicant?.id),
          ),
        });
        void router.replace("/applicant/session");
      });
    } else {
      alert("failed. Now Reload");
    }
  }, [queryClient, router, applicant?.id, checkPayment]);

  return (
    <div className="h-screen w-screen flex flex-col  items-center justify-center">
      <div className="spinner-container">
        <Image
          src="/images/khalti.png"
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
