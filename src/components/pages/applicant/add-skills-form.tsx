import { Button } from "@/components/ui/button";
import {
  getUserControllerSelfQueryKey,
  useSkillControllerCreate,
  useSkillControllerFindAll,
  useUserControllerSelf,
} from "@/api/generated";
import { Loader2, PlusCircle } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { experienceArray } from "@/lib/constant";

function ApplicantProfileForm() {
  const { data: me } = useUserControllerSelf();
  const { mutateAsync: addUserSkills, isLoading } = useSkillControllerCreate();

  const [data, setData] = useState<{ skillName: string; skillXp: string }[]>(
    [],
  );

  const [currentData, setCurrentData] = useState<{
    skillName?: string;
    skillXp?: string;
  } | null>(null);
  const allAddedSkills = data.map((d) => d.skillName);
  const { toast } = useToast();

  const router = useRouter();
  const queryClient = useQueryClient();

  async function onSubmit() {
    if (!me) return;
    // Do something with the form values.
    for (let i = 0; i < data.length; i++) {
      await addUserSkills({
        data: {
          skill_name: data[0].skillName,
          skill_experience: Number(data[0].skillXp),
          user_id: me.id,
        },
      }).catch((err) => {
        toast({
          title: "Failed to submit",
          description: "Please Try again, Something went wrong",
        });
      });
    }
    await queryClient.invalidateQueries({
      queryKey: getUserControllerSelfQueryKey(),
    });
    void router.replace("/applicant/dashboard");
  }

  const { data: skills } = useSkillControllerFindAll();

  return (
    <div>
      <h1 className="text-lg font-medium ">Add At least Two skills</h1>
      <span className="text-xs text-slate-700">
        Your skills help us better understand your ability. Add the relevant
        years of experiences with the field as well.
      </span>
      {data?.map((d) => {
        return (
          <div className="flex gap-8 mt-4" key={d.skillName}>
            <Select disabled value={d.skillName}>
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Skills" />
              </SelectTrigger>
              <SelectContent>
                {skills?.map((skill) => {
                  return (
                    <SelectItem
                      value={String(skill.skill_name)}
                      key={skill.skill_id}
                    >
                      {skill.skill_name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>{" "}
            <Select disabled value={d.skillXp}>
              <SelectTrigger className="mw-[180px]">
                <SelectValue placeholder="Years of Experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceArray.map((e) => {
                  return (
                    <SelectItem value={e.value.toString()} key={e.value}>
                      {e.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        );
      })}
      <div className="flex gap-8 mt-4">
        <Select
          onValueChange={(value) => {
            setCurrentData((_v) => ({ ...(_v ?? {}), skillName: value }));
          }}
        >
          <SelectTrigger className="min-w-[180px]">
            <SelectValue placeholder="Skills" />
          </SelectTrigger>
          <SelectContent>
            {skills?.map((skill) => {
              if (allAddedSkills.includes(skill.skill_name.toString()))
                return null;
              return (
                <SelectItem
                  value={String(skill.skill_name)}
                  key={skill.skill_id}
                >
                  {skill.skill_name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>{" "}
        <Select
          onValueChange={(value) =>
            setCurrentData((_v) => ({ ...(_v ?? {}), skillXp: value }))
          }
        >
          <SelectTrigger className="mw-[180px]">
            <SelectValue placeholder="Years of Experience" />
          </SelectTrigger>
          <SelectContent>
            {experienceArray.map((e) => {
              return (
                <SelectItem value={e.value.toString()} key={e.value}>
                  {e.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="secondary"
        className="flex items-center mt-4"
        onClick={() => {
          if (!currentData) return;
          if (!currentData.skillXp) return;
          if (currentData.skillName && currentData.skillXp) {
            setData((_d) => [
              ..._d,
              {
                skillXp: currentData.skillXp!,
                skillName: currentData.skillName!,
              },
            ]);
            setCurrentData(null);
          }
        }}
      >
        <PlusCircle className="w-5 h-5 mr-2" /> Add More Skills
      </Button>

      <div className="flex justify-end gap-2">
        <Button
          type="reset"
          onClick={() => {
            setData([]);
            setCurrentData(null);
          }}
          variant="outline"
        >
          <div className="flex items-center">
            <span>Reset</span>
          </div>
        </Button>

        <Button type="submit" disabled={isLoading} onClick={() => onSubmit()}>
          <div className="flex items-center">
            {isLoading && <Loader2 className="mt-3 w-4 h-4  animate-spin" />}
            <span>Submit</span>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default ApplicantProfileForm;
