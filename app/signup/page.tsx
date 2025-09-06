import NoAuth from '@/components/templates/NoAuth';
import SignupForm from '@/components/organisms/SignupForm';

export default function SignupPage() {
  return (
    <NoAuth>
      <SignupForm />
    </NoAuth>
  );
}
