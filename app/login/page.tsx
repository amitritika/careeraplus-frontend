import AuthLayout from '@/components/templates/AuthLayout';
import LoginForm from '@/components/organisms/LoginForm';

export default function Page() {
  return <AuthLayout title="Welcome back"><LoginForm /></AuthLayout>;
}
