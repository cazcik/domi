import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "introducing domi",
  },
};

export default function IndexPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="m-auto w-full max-w-xl">
        <div className="flex items-center gap-x-1 px-6 text-black">
          <h1 className="text-xl font-bold text-black lg:text-2xl">domi.</h1>
        </div>
        <div className="flex flex-col px-6 text-lg text-neutral-500 lg:mt-1 lg:text-xl">
          <p>the friendly way to homeschool.</p>
        </div>
      </div>
    </div>
  );
}
