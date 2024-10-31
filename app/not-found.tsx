import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="m-auto w-full max-w-xl">
        <div className="flex flex-col px-6">
          <h1 className="text-xl font-bold text-black lg:text-2xl">404.</h1>
          <p className="text-lg text-neutral-500 lg:mt-1 lg:text-xl">
            sorry, that page doesn't seem to exist.
          </p>
        </div>
      </div>
    </div>
  );
}
