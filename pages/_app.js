import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
import fetch from "../lib/fetchJson";
import "../styles/mystyles.scss";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  );
}

export default MyApp;
