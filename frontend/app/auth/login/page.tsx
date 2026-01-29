import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <AuthForm type="login" />
    </div>
  );
}