"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { appName } from "@/utils/utils";
import dynamic from "next/dynamic";

const IMEPayIntegration = dynamic(() => import("./imepay_form"), {
  ssr: false,
});

const EsewaIntegration = dynamic(() => import("./esewa_form"), {
  ssr: false,
});

function PaymentContent() {
  const params = useSearchParams();

  const method = params.get("method");
  const item = params.get("item");

  return (
    <div className="w-full h-full flex items-center justify-center">
      {method === "imepay" && item && <IMEPayIntegration item={item} />}
      {method === "esewa" && item && <EsewaIntegration item={item} />}
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
      <p className="mb-5 font-semibold text-2xl max-sm:mb-3">
        <Link href="/">
          <span>{appName}</span>
        </Link>{" "}
        | Payment
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentContent />
      </Suspense>
    </main>
  );
}