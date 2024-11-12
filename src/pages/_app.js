import '@/styles/globals.css';
import '@/styles/fontes.css';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from '@clerk/nextjs';

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      {/* Condicional de autenticação */}
      <SignedOut>
        <SignInButton /> {/* Botão para login quando usuário não está autenticado */}
      </SignedOut>
      
      <SignedIn>
        <UserButton /> {/* Botão de perfil do usuário quando autenticado */}
      </SignedIn>
      
      {/* Componente principal da aplicação */}
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
