// // hooks/usePaddle.tsx
// "use client";
// import {
//   initializePaddle,
//   InitializePaddleOptions,
//   Paddle,
// } from "@paddle/paddle-js";
// import { useEffect, useState } from "react";

// import { config } from "dotenv";
// config();

// export default function usePaddle() {
//   const [paddle, setPaddle] = useState<Paddle>();
//   useEffect(() => {
//     initializePaddle({
//       environment: process.env.PADDLE_ENV! ? "production" : "sandbox",
//       token: process.env.PADDLE_CLIENT_TOKEN!,
//       seller: Number(process.env.PADDLE_SELLER_ID),
//     } as unknown as InitializePaddleOptions).then(
//       (paddleInstance: Paddle | undefined) => {
//         if (paddleInstance) {
//           setPaddle(paddleInstance);
//         }
//       }
//     );
//   }, []);

//   return paddle;
// }


// hooks/usePaddle.tsx
"use client";
import { initializePaddle, InitializePaddleOptions, Paddle } from "@paddle/paddle-js";
import dotenv from "dotenv";
import { useEffect, useState } from "react";

import {NEXT_PUBLIC_PADDLE_ENV, PADDLE_CLIENT_TOKEN, PADDLE_SELLER_ID} from "@/utils/utils";


dotenv.config();

export default function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle>();
  useEffect(() => {
    console.log("Initializing Paddle...");
    console.log("Paddle environment:", NEXT_PUBLIC_PADDLE_ENV! ? "production" : "sandbox");
    console.log("Paddle client token:", PADDLE_CLIENT_TOKEN);
    console.log("Paddle seller ID:", PADDLE_SELLER_ID);
    console.log(typeof PADDLE_SELLER_ID);


    initializePaddle({
      environment: process.env.PADDLE_ENV! ? "production" : "sandbox",
      token: process.env.PADDLE_CLIENT_TOKEN!,
      seller: process.env.PADDLE_SELLER_ID,
    } as unknown as InitializePaddleOptions).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  return paddle;
}