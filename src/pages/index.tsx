import { Button } from "@/components/ui/button";
import ApplicantLayout from "@/components/layout/applicant-layout";
import { ReactElement } from "react";

export default function Home() {
  return (
    <div className="rounded-2xl bg-white p-4 flex flex-col justify-center gap-4 items-center min-h-[200px]">
      <p className="text-xl font-bold text-center">
        Your Dream Career is Just a single step from you
      </p>
      <div className="text-center">
        Go ahead! Complete your profile. Search for an expert and schedule a
        one-on-one interview session
      </div>
      <Button>Schedule Interview</Button>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <ApplicantLayout>{page}</ApplicantLayout>;
};
