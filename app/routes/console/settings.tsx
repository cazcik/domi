import { useState } from "react";
import type { Route } from "./+types/home";
import { data, redirect } from "react-router";
import { Field, Radio, RadioGroup } from "@headlessui/react";

import { currentUser, workspaces, plans } from "../../../data.json";

export async function loader({ params }: Route.LoaderArgs) {
  // check if user is authenticated
  if (!currentUser) {
    return redirect("/sign-in");
  }

  // check if user has access to the requested workspace
  if (
    !currentUser.workspaces ||
    currentUser.workspaces.length === 0 ||
    !currentUser.workspaces.find(
      (workspace) => workspace.slug === params.workspaceSlug,
    )
  ) {
    throw data("Workspace not found.", { status: 404 });
  }

  const workspace = workspaces.find(
    (workspace) => workspace.slug === params.workspaceSlug,
  );

  // check if slug exists and get workspace
  if (
    !workspace ||
    !params.workspaceSlug ||
    params.workspaceSlug.length === 0
  ) {
    throw data("Workspace not found.", { status: 404 });
  }

  return workspace;
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Settings - Domi" }];
}

export default function Settings({ loaderData }: Route.ComponentProps) {
  const workspace = loaderData;

  const currentPlan = workspace.settings.billing.plan;
  const plan = plans.find((plan) => plan.slug === currentPlan);
  const [selectedPlan, setSelectedPlan] = useState<typeof plan | undefined>(
    plan,
  );

  const defaultPaymentMethod = workspace.settings.billing.paymentMethods.find(
    (method) => method.default,
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    typeof defaultPaymentMethod | undefined
  >(defaultPaymentMethod);

  return (
    <div>
      <div className="p-7">
        <div>
          <h1 className="pb-1 text-lg font-bold text-neutral-900 sm:pb-2 sm:text-xl">
            Settings
          </h1>
          <p className="text-sm text-neutral-500">
            Options and settings for the organization.
          </p>
        </div>
        <form className="mt-3 flex max-w-sm flex-col">
          <div>
            <label className="ml-0.5 text-sm text-neutral-700" htmlFor="name">
              Workspace Name
            </label>
            <input
              required
              id="name"
              type="name"
              name="name"
              autoComplete="off"
              defaultValue={workspace.name}
              className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:ring focus:ring-neutral-400"
            />
          </div>
          <div className="pt-3">
            <label className="ml-0.5 text-sm text-neutral-700" htmlFor="slug">
              Workspace Slug
            </label>
            <input
              required
              id="slug"
              type="slug"
              name="slug"
              autoComplete="off"
              defaultValue={workspace.slug}
              className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:ring focus:ring-neutral-400"
            />
          </div>
          <div className="pt-3">
            <label className="ml-0.5 text-sm text-neutral-700" htmlFor="email">
              Workspace Billing Email
            </label>
            <input
              required
              id="billingEmail"
              type="billingEmail"
              name="billingEmail"
              autoComplete="off"
              defaultValue={workspace.billingEmail}
              className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:ring focus:ring-neutral-400"
            />
          </div>
          <div className="pt-3">
            <button
              type="submit"
              className="w-full rounded-lg border border-neutral-200 bg-neutral-800 px-3 py-1.5 text-neutral-100 outline-none placeholder:text-neutral-500 hover:bg-neutral-900 hover:text-white focus:ring focus:ring-neutral-400 sm:w-auto sm:px-6"
            >
              Save
            </button>
          </div>
        </form>
        <div className="mt-10">
          <h1 className="pb-1 text-lg font-bold text-neutral-900 sm:pb-2 sm:text-xl">
            Domains
          </h1>
          <p className="text-sm text-neutral-500">
            Configure and verify your domains.
          </p>
        </div>
        <form className="mt-3 flex max-w-sm flex-col">
          <div>
            {workspace.settings.domains &&
            workspace.settings.domains.length > 0 ? (
              <div className="flex flex-col gap-y-2">
                {workspace.settings.domains.map((domain) => (
                  <div
                    key={domain.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2.5"
                  >
                    <div className="flex items-center gap-x-2">
                      <p className="text-black">{domain.domain}</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <p className="flex items-center">
                        {domain.verified ? (
                          <span className="rounded-lg border border-green-200 bg-green-50 px-2 py-1 text-xs text-green-800">
                            Verified
                          </span>
                        ) : (
                          <span className="rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-800">
                            Unverified
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="w-full cursor-pointer rounded-lg border border-neutral-200 bg-white px-3 py-3 text-neutral-900 outline-none focus:ring focus:ring-neutral-400">
                  <div className="font-medium text-black">Add new domain</div>
                </div>
              </div>
            ) : (
              <div className="w-full cursor-pointer rounded-lg border border-neutral-200 bg-white px-3 py-3 text-neutral-900 outline-none focus:ring focus:ring-neutral-400">
                <div className="font-medium text-black">Add new domain</div>
              </div>
            )}
          </div>
        </form>
        <div className="mt-10">
          <h1 className="pb-1 text-lg font-bold text-neutral-900 sm:pb-2 sm:text-xl">
            Billing
          </h1>
          <p className="text-sm text-neutral-500">
            Configure your plan and payment methods.
          </p>
        </div>
        <form className="mt-3 flex max-w-sm flex-col">
          <div>
            <label className="ml-0.5 text-sm text-neutral-700">
              Current Plan
            </label>
            <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
              {plans.map((plan) => (
                <Field key={plan.slug} className="flex">
                  <Radio
                    value={plan}
                    className="mt-3 w-full cursor-pointer rounded-lg border border-neutral-200 bg-white px-3 py-3 text-neutral-900 outline-none focus:ring focus:ring-neutral-400 data-[checked]:border-black"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-black">{plan.name}</div>
                      <div className="text-neutral-500">
                        <span className="text-green-600">${plan.price}</span>/
                        {plan.term}
                      </div>
                    </div>
                  </Radio>
                </Field>
              ))}
            </RadioGroup>
          </div>
          <div className="pt-3">
            <button
              type="submit"
              className="w-full rounded-lg border border-neutral-200 bg-neutral-800 px-3 py-1.5 text-neutral-100 outline-none placeholder:text-neutral-500 hover:bg-neutral-900 hover:text-white focus:ring focus:ring-neutral-400 sm:w-auto sm:px-6"
            >
              Save
            </button>
          </div>
        </form>
        <form className="mt-6 flex max-w-sm flex-col">
          <div>
            <label className="ml-0.5 text-sm text-neutral-700">
              Current Payment Method
            </label>
            <RadioGroup
              value={selectedPaymentMethod}
              onChange={setSelectedPaymentMethod}
            >
              {workspace.settings.billing.paymentMethods &&
                workspace.settings.billing.paymentMethods.map((pay) => (
                  <Field key={pay.id} className="flex">
                    <Radio
                      value={pay}
                      className="mt-3 w-full cursor-pointer rounded-lg border border-neutral-200 bg-white px-3 py-3 text-neutral-900 outline-none focus:ring focus:ring-neutral-400 data-[checked]:border-black"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-black">
                          {pay.brand} ({pay.last4})
                        </div>
                        <div className="text-neutral-500">{pay.expMonth}</div>
                      </div>
                    </Radio>
                  </Field>
                ))}
              <div className="mt-3 w-full cursor-pointer rounded-lg border border-neutral-200 bg-white px-3 py-3 text-neutral-900 outline-none focus:ring focus:ring-neutral-400">
                <div className="font-medium text-black">Add new method</div>
              </div>
            </RadioGroup>
          </div>
          <div className="pt-3">
            <button
              type="submit"
              className="w-full rounded-lg border border-neutral-200 bg-neutral-800 px-3 py-1.5 text-neutral-100 outline-none placeholder:text-neutral-500 hover:bg-neutral-900 hover:text-white focus:ring focus:ring-neutral-400 sm:w-auto sm:px-6"
            >
              Save
            </button>
          </div>
        </form>
        <div className="mt-6 flex max-w-sm flex-col">
          <div>
            <label className="text-sm text-neutral-700">Recent Invoices</label>
          </div>
          <div className="mt-3">
            {workspace.settings.billing.invoices &&
            workspace.settings.billing.invoices.length > 0 ? (
              <div className="flex flex-col gap-y-2">
                {workspace.settings.billing.invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2.5"
                  >
                    <div className="flex items-center gap-x-2">
                      <p className="text-black">
                        {new Date(invoice.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <p className="flex items-center">
                        <span className="rounded-lg border border-sky-200 bg-sky-50 px-2 py-1 text-xs text-sky-800">
                          ${invoice.amount}
                        </span>
                      </p>
                      <p className="flex items-center">
                        {invoice.status === "Paid" ? (
                          <span className="rounded-lg border border-green-200 bg-green-50 px-2 py-1 text-xs text-green-800">
                            Paid
                          </span>
                        ) : invoice.status === "Pending" ? (
                          <span className="rounded-lg border border-yellow-200 bg-yellow-50 px-2 py-1 text-xs text-yellow-800">
                            Pending
                          </span>
                        ) : (
                          <span className="rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-800">
                            Failed
                          </span>
                        )}
                      </p>
                      {invoice.paymentMethod &&
                      invoice.paymentMethod.brand &&
                      invoice.paymentMethod.last4 ? (
                        <p className="flex items-center">
                          <span className="rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs text-indigo-800">
                            {invoice.paymentMethod.brand} •{" "}
                            {invoice.paymentMethod.last4}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 italic">
                No recent invoices.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
