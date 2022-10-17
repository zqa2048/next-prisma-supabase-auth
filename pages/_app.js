import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvide as AuthProvider } from "next-auth";

function MyApp({ Component, pageProps:{session,...pageProps} }) {
  return (
    <>
      <AuthProvider session={session}>
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default MyApp;
