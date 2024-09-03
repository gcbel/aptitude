/* DEPENDENCIES */
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./styles/styles.css";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";

const httpLink = createHttpLink({
  uri: "/graphql",
});

/* AUTH TOKEN */
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/* CLIENT */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

/* ROOT */
export default function Root() {
  return (
    <ApolloProvider client={client}>
      <div className="min-width" id="main-outer-div">
        <header>
          <Nav />
        </header>
        <main id="main-inner-div">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}
