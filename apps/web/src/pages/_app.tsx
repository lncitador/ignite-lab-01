import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { UserProvider } from "@auth0/nextjs-auth0"
import store from "../store";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
