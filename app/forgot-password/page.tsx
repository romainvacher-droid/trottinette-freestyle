import { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';

export const metadata = {
  title: 'Mot de passe oublié – Trottinette Freestyle',
  description: 'Réinitialisez votre mot de passe.',
  robots: { index: false, follow: false }
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
