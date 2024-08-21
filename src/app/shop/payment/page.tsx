

// // "use client";
// // import Link from "next/link";
// // import RazorpayIntegration from "./razorpay_form";
// // import { useSearchParams } from "next/navigation";
// // import React from "react";
// // import { appName } from "@/utils/utils";
// // import ManualPayment from './manualpay_form';
// // import IMEPayIntegration from './imepay_form';

// // export default function Page() {
// //   const params = useSearchParams();
// //   console.log(params);

// //   return (
// //     <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
// //       <p className="mb-5 font-semibold text-2xl max-sm:mb-3">
// //         <Link href="/">
// //           <span> {appName} </span>
// //         </Link>{' '}
// //         | Payment
// //       </p>
// //       <div className="w-full h-full flex items-center justify-center">
// //         {params.get('method') === 'razorpay' ? (
// //           <RazorpayIntegration item={params.get('item')} />
// //         ) : params.get('method') === 'manual' ? (
// //           <ManualPayment item={params.get('item')} />
// //         ) : params.get('method') === 'imepay' ? (
// //           <IMEPayIntegration item={params.get('item')} />
// //         ) : null}
// //       </div>
// //     </main>
// //   );
// // }

// "use client";
// import Link from "next/link";
// import RazorpayIntegration from "./razorpay_form";
// import { useSearchParams } from "next/navigation";
// import React from "react";
// import { appName } from "@/utils/utils";
// import ManualPayment from './manualpay_form';
// import IMEPayIntegration from './imepay_form';
// import EsewaIntegration from './esewa_form'; // Import the eSewa component

// export default function Page() {
//   const params = useSearchParams();
//   console.log(params);

//   return (
//     <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
//       <p className="mb-5 font-semibold text-2xl max-sm:mb-3">
//         <Link href="/">
//           <span> {appName} </span>
//         </Link>{' '}
//         | Payment
//       </p>
//       <div className="w-full h-full flex items-center justify-center">
//         {params.get('method') === 'razorpay' ? (
//           <RazorpayIntegration item={params.get('item')} />
//         ) : params.get('method') === 'manual' ? (
//           <ManualPayment item={params.get('item')} />
//         ) : params.get('method') === 'imepay' ? (
//           <IMEPayIntegration item={params.get('item')} />
//         ) : params.get('method') === 'esewa' ? (
//           <EsewaIntegration item={params.get('item')} /> // Add eSewa option
//         ) : null}
//       </div>
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import RazorpayIntegration from "./razorpay_form";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { appName } from "@/utils/utils";
import ManualPayment from './manualpay_form';
import IMEPayIntegration from './imepay_form';
import EsewaIntegration from './esewa_form'; // Import the eSewa component

function PaymentContent() {
  const params = useSearchParams();
  console.log(params);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {params.get('method') === 'razorpay' ? (
        <RazorpayIntegration item={params.get('item')} />
      ) : params.get('method') === 'manual' ? (
        <ManualPayment item={params.get('item')} />
      ) : params.get('method') === 'imepay' ? (
        <IMEPayIntegration item={params.get('item')} />
      ) : params.get('method') === 'esewa' ? (
        <EsewaIntegration item={params.get('item')} />
      ) : null}
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
      <p className="mb-5 font-semibold text-2xl max-sm:mb-3">
        <Link href="/">
          <span> {appName} </span>
        </Link>{' '}
        | Payment
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentContent />
      </Suspense>
    </main>
  );
}
