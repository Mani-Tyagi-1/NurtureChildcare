import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function WorkTimeline() {
  const data = [
    {
      title: "01",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-black md:text-sm dark:text-black">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch
          </p>
        </div>
      ),
    },
    {
      title: "02",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-black md:text-sm dark:text-black">
            I usually run out of copy, but when I see content this big, I try to
            integrate lorem ipsum.
          </p>
          <p className="mb-8 text-xs font-normal text-black md:text-sm dark:text-black">
            Lorem ipsum is for people who are too lazy to write copy. But we are
            not. Here are some more examples of beautiful designs I built.
          </p>
        </div>
      ),
    },
    {
      title: "03",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-black md:text-sm dark:text-black">
            Deployed 5 new components on Aceternity today
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-black md:text-sm dark:text-black">
              ✅ Card grid component
            </div>
            <div className="flex items-center gap-2 text-xs text-black md:text-sm dark:text-black">
              ✅ Startup template Aceternity
            </div>
            <div className="flex items-center gap-2 text-xs text-black md:text-sm dark:text-black">
              ✅ Random file upload lol
            </div>
            <div className="flex items-center gap-2 text-xs text-black md:text-sm dark:text-black">
              ✅ Himesh Reshammiya Music CD
            </div>
            <div className="flex items-center gap-2 text-xs text-black md:text-sm dark:text-black">
              ✅ Salman Bhai Fan Club registrations open
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    // how we work and pur 4 stages coming from the component
    <div className="relative w-full overflow-clip bg-white p-6">
      <Timeline data={data} />
    </div>
  );
}
