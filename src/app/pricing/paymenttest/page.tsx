'use client';

import { useEffect } from 'react';
import { initializePaddle } from '@paddle/paddle-js';

export default function CheckoutPage() {
  useEffect(() => {
    const initPaddle = async () => {
      try {
        const paddleInstance = await initializePaddle({
          token: 'test_0592d7578edf803262da4c97ccf',
          environment: 'sandbox',
          checkout: {
            settings: {
              frameTarget: 'self',
              frameInitialHeight: 450,
              frameStyle: 'width: 100%; min-width: 312px; background-color: transparent; border: none;'
            }
          }
        });

        console.log('Paddle initialized');
      } catch (error) {
        console.error('Failed to initialize Paddle:', error);
      }
    };

    initPaddle();
  }, []);

  const openCheckout = async () => {
    if (typeof window !== 'undefined' && window.Paddle) {
      try {
        const checkout = await window.Paddle.Checkout.open({
          items: [{ priceId: 'pri_01jbpha9zvtkx2q859tv7kms7q', quantity: 1 }],
        });
        console.log('Checkout completed', checkout);
      } catch (error) {
        console.error('Checkout failed:', error);
      }
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <button onClick={openCheckout}>Open Checkout</button>
    </div>
  );
}