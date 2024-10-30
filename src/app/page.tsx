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
        <div className="flex flex-col px-6">
          <h1 className="text-xl font-bold text-black lg:text-2xl">domi.</h1>
          <p className="text-lg text-neutral-500 lg:mt-1 lg:text-xl">
            the friendly way to homeschool.
          </p>
        </div>
      </div>
    </div>
  );
}
