import { isError, useMutation, useQueryClient } from "@tanstack/react-query"
import { FormEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigate = useNavigate()
  const qc = useQueryClient()
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const { mutateAsync, isError } = useMutation({
    mutationFn: async () => {
      return await (
        await fetch(`${import.meta.env.VITE_SERVER}/auth/login`, {
          body: JSON.stringify({
            email: emailRef.current?.value,
            password: passwordRef.current?.value
          }),
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          }
        })
      ).json()
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await mutateAsync()
      if (!isError) {
        navigate("/", {
          preventScrollReset: true,
          replace: true
        })
        qc.invalidateQueries(["auth-status"])
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="mx-auto max-w-3xl my-5 px-4">
      <form
        className="rounded-xl bg-gray-500/20 grid gap-5 md:p-16 p-8"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-1 text-lg w-full">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            ref={emailRef}
            className="p-2 text-xl rounded bg-black border-none outline-none focus-visible:ring-2 ring-fuchsia-500"
          />
        </div>
        <div className="grid gap-1 text-lg relative">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            ref={passwordRef}
            className="p-2 text-xl rounded bg-black border-none outline-none focus-visible:ring-2 ring-fuchsia-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            title={isPasswordVisible ? "Hide password" : "Show password"}
            className="absolute right-2 bottom-[6px] cursor-pointer rounded hover:bg-gray-600/40 transition-all ease-in p-1"
          >
            {isPasswordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <button className="p-2 border-none outline-none bg-blue-500 hover:bg-blue-600 rounded font-bold text-xl transition-all ease-out focus-visible:ring-4 focus-visible:bg-transparent ring-blue-700 focus-visible:text-blue-700 active:scale-95">
          Submit
        </button>
      </form>
    </main>
  )
}

export default LoginPage
