import React, { useState } from 'react';

interface EsewaIntegrationProps {
  item: string | null;
}

const EsewaIntegration: React.FC<EsewaIntegrationProps> = ({ item }) => {
  const [formData, setFormData] = useState<any>(null);

  const handlePayment = async () => {
    if (!item) {
      console.error('No item specified for payment');
      return;
    }

    try {
      const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080';
      const token = localStorage.getItem('token');

      const response = await fetch(`${serverURL}/esewa/create-order-esewa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ item }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate eSewa payment');
      }

      const data = await response.json();
      setFormData(data.formData);
    } catch (error) {
      console.error('Error initiating eSewa payment:', error);
    }
  };

  const submitForm = () => {
    if (!formData) return;

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formData.url;

    Object.keys(formData).forEach((key) => {
      if (key !== 'url') {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formData[key];
        form.appendChild(input);
      }
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">eSewa Payment</h2>
        <p>Click the button below to proceed with eSewa payment.</p>
        <div className="card-actions justify-end">
          <button 
            className="btn btn-primary" 
            onClick={handlePayment}
            disabled={!item}
          >
            Pay with eSewa
          </button>
          {formData && (
            <button className="btn btn-secondary" onClick={submitForm}>
              Submit Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EsewaIntegration;