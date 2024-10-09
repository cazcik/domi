import { Metadata } from "next";

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
          <h1 className="text-2xl font-bold text-black">domi.</h1>
        </div>
        <div className="mt-4 flex flex-col px-6 text-lg text-neutral-500">
          <p>
            the friendly way to homeschool. your own custom teachers assistant
            for homeschoolers.
          </p>
        </div>
      </div>
    </div>
  );
}
