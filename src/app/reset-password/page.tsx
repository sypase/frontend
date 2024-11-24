// // reset-password/page.tsx
// import Link from 'next/link';

// const ResetPasswordPage = () => {
//   return (
//     <div>
//       <h1>Reset Password</h1>
//       <p>
//         If you have a reset code, please click the following link to reset your
//         password:
//       </p>
//       <Link href="/reset-password/ResetPasswordFromLink">
//         Reset Password From Link
//       </Link>
//     </div>
//   );
// };

// export default ResetPasswordPage;


// reset-password/page.tsx
import Link from 'next/link';

const ResetPasswordPage = () => {
  return (
    <div>
      <h1>Reset Password</h1>
      <p>
        If you have a reset code, please click the following link to reset your
        password:
      </p>
      <Link href="/reset-password/ResetPasswordFromLink">
        Reset Password From Link
      </Link>
    </div>
  );
};

export default ResetPasswordPage;