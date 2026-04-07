import { Metadata } from 'next';
import SignupClient from './SignupClient';

export const metadata = {
  title: 'Inscription – Trottinette Freestyle',
  description: 'Créez un compte gratuit sur Trottinette Freestyle.',
  robots: { index: false, follow: false }
};

export default function SignupPage() {
  return <SignupClient />;
}
