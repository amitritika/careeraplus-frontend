import LoginForm from '@/components/LoginForm';
import SocialLoginButtons from '@/components/SocialLoginButtons';

export default function LoginPage() {
  return (
    <div className="py-8">
      <LoginForm />

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-800" />
        <span className="text-xs text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-800" />
      </div>

      <div className="mx-auto max-w-sm">
        <SocialLoginButtons />
      </div>
    </div>
  );
}
