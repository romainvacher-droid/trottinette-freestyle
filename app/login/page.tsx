import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata = {
  title: 'Connexion – Trottinette Freestyle',
  description: 'Connectez-vous à votre compte Trottinette Freestyle.',
  robots: { index: false, follow: false }
};

export default function LoginPage() {
  return <LoginClient />;
}
