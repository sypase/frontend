// hooks/usePaddle.ts
"use client";

import { initializePaddle, InitializePaddleOptions, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

export function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    const environment = process.env.NEXT_PUBLIC_PADDLE_ENV === "production" ? "production" : "sandbox";
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

    if (!token) {
      console.error("Paddle client token is not defined.");
      return;
    }

    initializePaddle({
      environment,
      token,
    } as InitializePaddleOptions)
      .then((paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        } else {
          console.error("Failed to initialize Paddle.");
        }
      })
      .catch((error) => {
        console.error("Error initializing Paddle:", error);
      });
  }, []);

  return paddle;
}