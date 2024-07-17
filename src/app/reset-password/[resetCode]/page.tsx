// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useClient } from 'next-ssr-react';

// const ResetCode = () => {
//   const [password, setPassword] = useState('');
//   const router = useRouter();
//   const { resetCode } = router.query;
//   console.log(resetCode);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/reset-password/confirm', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ resetCode, newPassword: password }),
//       });
//       if (response.ok) {
//         router.push('/password-reset-successful');
//       } else {
//         // Handle error
//       }
//     } catch (error) {
//       console.error('Error confirming password reset:', error);
//       // Handle error
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="password">New Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default useClient(ResetCode);


// reset-password/[resetCode]/page.tsx
// "use client";
// import { useSearchParams } from 'next/navigation';

// // reset-password/[resetCode]/page.tsx
// const ResetPasswordPage = ({ params }: { params: { resetCode: string } }) => {
//   const resetCode = params.resetCode;
//   console.log(resetCode);
  

//   return (
//     <div>
//       <h1>Reset Password</h1>
//       <p>Reset Code: {resetCode}</p>
//       {/* Add your reset password form here */}
//     </div>
//   );
// };

// export default ResetPasswordPage;


// reset-password/[resetCode]/page.tsx
// 'use client';

// import { useSearchParams } from 'next/navigation';
// import { useState } from 'react';
// import axios from 'axios';

// const ResetPasswordPage = () => {
//   const searchParams = useSearchParams();
//   const resetCode = searchParams.get('resetCode');
//   const [newPassword, setNewPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/users/reset-password/confirm', {
//         resetCode,
//         newPassword,
//       });

//       setSuccess(response.data);
//       setNewPassword('');
//     } catch (err) {
//       setError("error");
//     }
//   };

//   return (
//     <div>
//       <h1>Reset Password</h1>
//       <p>Reset Code: {resetCode}</p>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//       {error && <p>{error}</p>}
//       {success && <p>{success}</p>}
//     </div>
//   );
// };

// export default ResetPasswordPage;




// import { useRouter } from 'next/router';
// import ResetPasswordFromLink from './ResetPasswordFromLink';

// const ResetPasswordPage: React.FC = () => {
//   const router = useRouter();
//   const { resetCode } = router.query;

//   // If resetCode is not available or invalid, you may want to handle it accordingly
//   if (!resetCode || typeof resetCode !== 'string') {
//     return <div>Invalid reset code</div>;
//   }

//   return <ResetPasswordFromLink resetCode={resetCode} />;
// };

// export default ResetPasswordPage;

// import React, { useState } from 'react';
// import { useRouter } from 'next/router';

// const ResetCode = () => {
//   const [password, setPassword] = useState('');
//   const router = useRouter();
//   const { resetCode } = router.query;
//   console.log(resetCode);
  

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/reset-password/confirm', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ resetCode, newPassword: password }),
//       });
//       if (response.ok) {
//         router.push('/password-reset-successful');
//       } else {
//         // Handle error
//       }
//     } catch (error) {
//       console.error('Error confirming password reset:', error);
//       // Handle error
//     }
//   };

  
//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="password">New Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ResetCode;

// import { useRouter } from 'next/router';

// const ResetCode = () => {
//   const router = useRouter();
//   const { resetCode } = router.query;
//   console.log(resetCode);

//   return (
//     <div>
//       <h2>Reset Code: {resetCode}</h2>
//     </div>
//   );
// };

// export default ResetCode;







// // pages/reset-password/[resetCode]/page.tsx
// import React, { useState } from 'react';
// import { useRouter } from 'next/router';

// const ResetCode = () => {
//   const [password, setPassword] = useState('');
//   const router = useRouter();
//   const { resetCode } = router.query;

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/reset-password/confirm', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ resetCode, newPassword: password }),
//       });
//       if (response.ok) {
//         router.push('/password-reset-successful');
//       } else {
//         // Handle error
//       }
//     } catch (error) {
//       console.error('Error confirming password reset:', error);
//       // Handle error
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="password">New Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ResetCode;

// 'use client';

// import { useState } from 'react';
// import axios from 'axios';
// import { serverURL } from '@/utils/utils';

// const ResetPasswordPage = ({ params }: { params: { resetCode: string } }) => {
//   const resetCode = params.resetCode;
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   console.log(resetCode); // This should log the correct reset code

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post(`${serverURL}/users/reset-password/confirm`, {
//         resetCode,
//         newPassword,
//       });

//       setSuccess(response.data);
//       setNewPassword('');
//       setConfirmPassword('');
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <main className="w-screen h-screen bg-base-100 flex justify-center items-center">
//       <div className="flex flex-col text-white p-10 max-w-md bg-primary rounded-md">
//         <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>
//         <p className="mb-8">Reset Code: {resetCode}</p>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="newPassword" className="text-sm mb-1 block">
//               New Password
//             </label>
//             <input
//               type="password"
//               id="newPassword"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="confirmPassword" className="text-sm mb-1 block">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="input input-bordered w-full"
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-full">
//             Reset Password
//           </button>
//         </form>
//         {error && <p className="text-error mt-4">{error}</p>}
//         {success && <p className="text-success mt-4">{success}</p>}
//       </div>
//     </main>
//   );
// };

// export default ResetPasswordPage;


// 'use client';
// import { useState } from 'react';
// import axios from 'axios';
// import { serverURL } from '@/utils/utils';
// import { useRouter } from 'next/navigation';

// const ResetPasswordPage = ({ params }: { params: { resetCode: string } }) => {
//   const router = useRouter();
//   const resetCode = params.resetCode;
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   console.log(resetCode); // This should log the correct reset code

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post(`${serverURL}/users/reset-password/confirm`, {
//         resetCode,
//         newPassword,
//       });

//       setSuccess(response.data);
//       setNewPassword('');
//       setConfirmPassword('');

//       // Redirect to the login page after 2 seconds
//       setTimeout(() => {
//         router.push('/login');
//       }, 2000);
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <main className="w-screen h-screen bg-base-100 flex justify-center items-center">
//       <div className="flex flex-col text-white p-10 max-w-md bg-primary rounded-md">
//         <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>
//         <p className="mb-8">Reset Code: {resetCode}</p>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="newPassword" className="text-sm mb-1 block">
//               New Password
//             </label>
//             <input
//               type="password"
//               id="newPassword"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="confirmPassword" className="text-sm mb-1 block">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="input input-bordered w-full"
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-full">
//             Reset Password
//           </button>
//         </form>
//         {error && <p className="text-error mt-4">{error}</p>}
//         {success && <p className="text-success mt-4">{success}</p>}
//       </div>
//     </main>
//   );
// };

// export default ResetPasswordPage;

'use client';
import { useState } from 'react';
import axios from 'axios';
import { serverURL } from '@/utils/utils';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = ({ params }: { params: { resetCode: string } }) => {
  const router = useRouter();
  const resetCode = params.resetCode;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${serverURL}/users/reset-password/confirm`, {
        resetCode,
        newPassword,
      });

      setSuccess(response.data);
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <main className="w-screen h-screen bg-base-100 flex flex-col items-center justify-center p-2 overflow-hidden">
            <div className="absolute top-0 left-0 p-4 mx-4 my-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">NoaiGPTχ</h1>
        </div>
      </div>
      <div className="animate-fade-in-bottom flex flex-col w-full max-w-md rounded-xl p-10 border border-gray-300">
        <h1 className="font-bold text-2xl mb-4">Reset Password</h1>
        <p className="mb-4">Reset Code: {resetCode}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="text-sm mb-1 block">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm mb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Reset Password
          </button>
        </form>
        {error && <p className="text-error mt-4">{error}</p>}
        {success && <p className="text-success mt-4">{success}</p>}
      </div>
    </main>
  );
};

export default ResetPasswordPage;
