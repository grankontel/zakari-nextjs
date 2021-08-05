import { Provider } from "next-auth/client";
import "../styles/mystyles.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
