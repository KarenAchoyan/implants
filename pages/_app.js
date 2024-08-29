import "@/styles/globals.css";
import useAuth from "../hooks/useAuth";
import store from "../store/store";

function App({Component, pageProps}) {
    useAuth('/login');
    return <Component {...pageProps} />
}

export default store.withRedux(App);