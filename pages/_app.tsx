import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/components.css";
import "../styles/cosmic-upgrade.css";
import "../styles/galaxy-skills.css";
import "../styles/cosmic-education.css";
import "../styles/cosmic-contacts.css";
import "../styles/cosmic-projects.css";
import "../styles/cosmic-voyage.css";
import "../styles/cosmic-education-ship.css";
import "../styles/cosmic-education-universe.css";
import "../styles/cosmic-splash.css";
import "../styles/cosmic-cursor.css";
import Layout from "../components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}