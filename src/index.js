import React from "react"
import ReactDOM from "react-dom/client"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import App from "./App"
import "./index.css"

const link = new HttpLink({
  uri: "https://countries.trevorblades.com/",
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
