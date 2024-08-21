// pages/cancelled.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { decodeIMEPayResponse } from '../utils/imePayDecoder';

const CancelledPage: React.FC = () => {
  const router = useRouter();
  const [cancelledData, setCancelledData] = useState<any>(null);

  useEffect(() => {
    if (router.query.data) {
      const decodedData = decodeIMEPayResponse(router.query.data as string);
      setCancelledData(decodedData);
    }
  }, [router.query]);

  if (!cancelledData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Response Code: {cancelledData.ResponseCode}</p>
      <p>Description: {cancelledData.ResponseDescription}</p>
      <p>Reference ID: {cancelledData.RefId}</p>
      <p>Your payment has been cancelled. If you'd like to try again, please return to the checkout page.</p>
    </div>
  );
};

export default CancelledPage;