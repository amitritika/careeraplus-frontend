import NoAuth from '@/components/templates/NoAuth';
import LoginForm from '@/components/organisms/LoginForm';

export default function LoginPage() {
  return (
    <NoAuth>
      <LoginForm />
    </NoAuth>
  );
}