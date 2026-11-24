import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/components.css";
import "../styles/cosmic-upgrade.css";
import Layout from "../components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}