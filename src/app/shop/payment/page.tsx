"use client";

import Link from "next/link";
import RazorpayIntegration from "./razorpay_form";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { appName } from "@/utils/utils";
import ManualPayment from './manualpay_form';
import IMEPayIntegration from './imepay_form';
import EsewaIntegration from './esewa_form'; // Import the eSewa component
import KhaltiIntegration from './esewa_form'; // Import the Khalti component

function PaymentContent() {
  const params = useSearchParams();

  const method = params.get('method');
  const item = params.get('item');

  return (
    <div className="w-full h-full flex items-center justify-center">
      {method === 'razorpay' && item && (
        <RazorpayIntegration item={item} />
      )}
      {method === 'manual' && item && (
        <ManualPayment item={item} />
      )}
      {method === 'imepay' && item && (
        <IMEPayIntegration item={item} />
      )}
      {method === 'esewa' && item && (
        <EsewaIntegration item={item} />
      )}
      {method === 'khalti' && item && (
        <KhaltiIntegration item={item} />
      )}
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
      <p className="mb-5 font-semibold text-2xl max-sm:mb-3">
        <Link href="/">
          <span>{appName}</span>
        </Link>{' '}
        | Payment
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentContent />
      </Suspense>
    </main>
  );
}
