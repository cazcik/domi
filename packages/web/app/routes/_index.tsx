import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Domi: The friendly way to homeschool" },
    {
      name: "description",
      content: "Domi is building a better way to homeschool.",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex min-h-dvh">
      <div className="m-auto p-5">
        <h1 className="text-xl font-bold text-black md:text-2xl">domi.</h1>
        <p className="text-neutral-600 md:text-lg">
          the friendly way to homeschool.
        </p>
      </div>
    </div>
  );
}
