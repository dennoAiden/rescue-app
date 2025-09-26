import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function VerifyEmail() {
  const { value: { userEmail } } = useContext(AppContext);

  const handleResendConfirmation = async () => {
    if (!userEmail) {
      toast.error('No email found.');
      return;
    }

    try {
      const response = await fetch('https://incident-report-apps.onrender.com/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        toast.success('A new confirmation email has been sent.');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Unable to resend email.');
      }
    } catch (error) {
      toast.error('Error resending confirmation email. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-gray-400 mb-6">
          A confirmation email has been sent to your inbox. Please check your email and click the
          confirmation link to activate your account <span className="text-blue-500">or check SPAM.</span>
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Didn’t receive the email? <button onClick={handleResendConfirmation} className="text-yellow-500">Resend</button>
        </p>
        <Link
          to="/signup"
          className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-yellow-600"
        >
          Back to Signup
        </Link>
      </div>
    </div>
  );
}
