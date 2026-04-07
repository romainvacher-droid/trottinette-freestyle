import { Metadata } from 'next';
import ResetPasswordClient from './ResetPasswordClient';

export const metadata = {
  title: 'Réinitialiser le mot de passe – Trottinette Freestyle',
  description: 'Définissez un nouveau mot de passe.',
  robots: { index: false, follow: false }
};

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
