'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import './failure.css';

const PaymentFailure: React.FC = () => {
    return (
        <div className="payment-failure">
            <h1>Payment Failed</h1>
            <p>Unfortunately, your payment could not be processed at this time.</p>
            <Link to="/retry" className="retry-button">Retry Payment</Link>
        </div>
    );
};

export default PaymentFailure;