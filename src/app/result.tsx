// pages/result.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { decodeIMEPayResponse } from '../utils/imePayDecoder';

const ResultPage: React.FC = () => {
  const router = useRouter();
  const [paymentResult, setPaymentResult] = useState<any>(null);

  useEffect(() => {
    if (router.query.data) {
      const decodedData = decodeIMEPayResponse(router.query.data as string);
      setPaymentResult(decodedData);
    }
  }, [router.query]);

  if (!paymentResult) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Payment Result</h1>
      <p>Response Code: {paymentResult.ResponseCode}</p>
      <p>Description: {paymentResult.ResponseDescription}</p>
      <p>Transaction ID: {paymentResult.TransactionId}</p>
      <p>Reference ID: {paymentResult.RefId}</p>
      <p>Amount: {paymentResult.TranAmount}</p>
      {paymentResult.ResponseCode === '0' ? (
        <p>Payment Successful!</p>
      ) : (
        <p>Payment Failed. Please try again.</p>
      )}
    </div>
  );
};

export default ResultPage;