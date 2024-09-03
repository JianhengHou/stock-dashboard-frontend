import React, { useState, useRef, useEffect } from 'react';
import { confirmSignUp, resendSignUpCode } from '@aws-amplify/auth';
import { FaTimes } from 'react-icons/fa';

interface VerificationModalProps {
  email: string;
  onClose: () => void;
  onSuccess: () => void;
}

const EnterCode: React.FC<{
  callback: (code: string) => void;
  reset: boolean;
  isLoading: boolean;
}> = ({ callback, reset, isLoading }) => {
  const [code, setCode] = useState('');
  const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement | null>(null));

  const resetCode = () => {
    inputRefs.forEach(ref => ref.current!.value = '');
    inputRefs[0].current!.focus();
    setCode('');
  };

  useEffect(() => {
    if (code.length === 6) {
      if (typeof callback === 'function') callback(code);
      resetCode();
    }
  }, [code]);

  useEffect(() => {
    resetCode();
  }, [reset]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const input = e.target;
    const newCode = [...code];
    newCode[index] = input.value;
    setCode(newCode.join(''));

    if (input.value === '') {
      inputRefs[index - 1]?.current?.focus();
    } else {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && (e.target as HTMLInputElement).value === '') {
      e.preventDefault();
      setCode(prevCode => prevCode.slice(0, index) + prevCode.slice(index + 1));
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedCode = e.clipboardData.getData('text');
    if (pastedCode.length === 6) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        inputRef.current!.value = pastedCode.charAt(index);
      });
    }
  };

  const ClearButton = () => (
    <button onClick={resetCode} className="absolute right-2 top-2 text-xl text-gray-500 hover:text-gray-700">
      <FaTimes />
    </button>
  );

  return (
    <div className="flex gap-2 relative justify-center">
      {[...Array(6)].map((_, index) => (
        <input
          className="text-2xl bg-gray-200 w-12 h-12 p-2 text-center border border-gray-300 rounded-lg"
          key={index}
          type="text"
          maxLength={1}
          onChange={(e) => handleInput(e, index)}
          ref={inputRefs[index]}
          autoFocus={index === 0}
          onFocus={handleFocus}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={isLoading}
        />
      ))}
      {code.length > 0 && <ClearButton />}
    </div>
  );
};

const VerificationModal: React.FC<VerificationModalProps> = ({ email, onClose, onSuccess }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [username, setUserName] = useState(email);
  const defaultLang = 'en';
  const language = localStorage.getItem('language') || defaultLang;

  const handleVerify = async (code: string) => {
    setIsLoading(true);
    setError('');
    try {
      await confirmSignUp({username:username, confirmationCode:code});
      setSuccess(language === 'en' ? 'Sign-up Successful! You will be automatically signed in!': '注册成功！将自动为您登录！');
      onSuccess(); // Notify parent component of successful verification
    } catch (error) {
      setError(language === 'en'
    ? `Error verifying email: ${error.message}`
    : `验证邮箱错误：${error.message}`
    );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setIsLoading(true);

    try {
      await resendSignUpCode({username:username});
      setReset(true); // Reset the code input
    } catch (error) {
      setError(`Error resending verification code: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative ">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Verify Your Email</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const code = (e.target as HTMLFormElement).code.value;
            handleVerify(code);
          }}
        >
          <div className="mb-4">
            <label htmlFor="verificationCode" className="block text-sm text-gray-600 mb-2 text-center">
              {language === 'en' ? 'Enter the 6-digit code sent to your email:': '请输入邮箱内6位验证码:'}
            </label>
            <EnterCode callback={handleVerify} reset={reset} isLoading={isLoading} />
          </div>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          {success && <div className="text-green-500 mb-4 text-center">{success}</div>}
        </form>
        <div className="text-sm text-gray-600 flex justify-center">
          {language === 'en' ? "Didn't receive code? ": '没有收到验证码？'}
          <button
            onClick={handleResendCode}
            disabled={isLoading}
            className="font-medium text-blue-500 hover:text-blue-600 ml-2"
          >
            {language === 'en' ? 'Resend':'重新发送'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
