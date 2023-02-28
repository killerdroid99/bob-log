import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./routes/HomePage"
import Header from "./components/Header"
import AboutPage from "./routes/AboutPage"
import LoginPage from "./routes/LoginPage"
import SignupPage from "./routes/SignupPage"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import CreatePostPage from "./routes/CreatePostPage"
import PostPage from "./routes/PostPage"
import UpdatePostPage from "./routes/UpdatePostPage"

const qc = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <HomePage />
      </>
    )
  },
  {
    path: "/about",
    element: (
      <>
        <Header />
        <AboutPage />
      </>
    )
  },
  {
    path: "/login",
    element: (
      <>
        <Header />
        <LoginPage />
      </>
    )
  },
  {
    path: "/signup",
    element: (
      <>
        <Header />
        <SignupPage />
      </>
    )
  },
  {
    path: "/create-post",
    element: (
      <>
        <Header />
        <CreatePostPage />
      </>
    )
  },
  {
    path: "/update-post/:id",
    element: (
      <>
        <Header />
        <UpdatePostPage />
      </>
    )
  },
  {
    path: "/post/:id",
    element: (
      <>
        <Header />
        <PostPage />
      </>
    )
  },
  {
    path: "/test",
    element: <div>Hello, testing!</div>
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
