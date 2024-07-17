// import React, { useState } from 'react';
// import axios from 'axios';
// import Joi from 'joi';

// interface ResetPasswordProps {
//   resetCode: string;
// }

// const ResetPasswordFromLink: React.FC<ResetPasswordProps> = ({ resetCode }) => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const schema = Joi.object({
//     newPassword: Joi.string().min(6).required(),
//     confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
//       'any.only': 'Passwords must match',
//     }),
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const { error } = schema.validate({ newPassword, confirmPassword });
//       if (error) {
//         throw new Error(error.message);
//       }

//       const response = await axios.post("/api/reset-password/confirm", { resetCode, newPassword });
//       if (response.status === 200) {
//         // Password reset successful
//         alert("Password reset successful");
//         // Redirect to login page or any other page as needed
//       }
//     } catch (err) {
//       setErrorMessage("An error occurred");
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       {errorMessage && <div className="error">{errorMessage}</div>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="newPassword">New Password:</label>
//           <input
//             type="password"
//             id="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPasswordFromLink;


// reset-password/ResetPasswordFromLink.tsx
// import Link from 'next/link';

// const ResetPasswordFromLink = () => {
//   const resetCode = 'yyehf'; // Replace this with the actual reset code

//   return (
//     <div>
//       <h1>Reset Password</h1>
//       <p>Click on the following link to reset your password:</p>
//       <Link href={`/reset-password/${resetCode}`}>
//         http://localhost:3000/reset-password/{resetCode}
//       </Link>
//     </div>
//   );
// };

// export default ResetPasswordFromLink;


// reset-password/ResetPasswordFromLink.tsx
import Link from 'next/link';

const ResetPasswordFromLink = () => {
  const resetCode = 'yyehf'; // Replace this with the actual reset code received from the backend

  return (
    <div>
      <h1>Reset Password</h1>
      <p>Click on the following link to reset your password:</p>
      <Link href={`/reset-password/${resetCode}`}>
        http://localhost:3000/reset-password/{resetCode}
      </Link>
    </div>
  );
};

export default ResetPasswordFromLink;