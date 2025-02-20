import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "introducing domi",
};

export default function Home() {
  return (
    <div className="flex min-h-dvh">
      <div className="m-auto px-5">
        <div>
          <h1 className="text-black dark:text-white text-xl md:text-2xl">
            domi.
          </h1>
          <p className="text-neutral-500 text-xl md:text-2xl">
            the missing product security toolkit.
          </p>
        </div>
      </div>
    </div>
  );
}
