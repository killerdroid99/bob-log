import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FormEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const SignupPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigate = useNavigate()
  const qc = useQueryClient()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const pwdRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLInputElement>(null)
  const loginRef = useRef<HTMLInputElement>(null)

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (urlSubString: string) => {
      return await (
        await fetch(`${import.meta.env.VITE_SERVER}/${urlSubString}`, {
          body: JSON.stringify({
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: pwdRef.current?.value
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
      if (pwdRef.current?.value !== confirmRef.current?.value) {
        return
      }
      if (loginRef.current?.checked) {
        await mutateAsync("auth/signup-and-login")
        if (!isError) {
          navigate("/", {
            preventScrollReset: true,
            replace: true
          })
          qc.invalidateQueries(["auth-status"])
        }
      } else {
        await mutateAsync("auth/signup")
        if (!isError) {
          navigate("/login", {
            preventScrollReset: true,
            replace: true
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)
  return (
    <main className="mx-auto max-w-3xl my-5 px-4">
      <form
        className="rounded-xl bg-gray-500/20 grid grid-cols-2 gap-x-4 gap-y-8 md:p-16 p-8"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-1 text-lg">
          <label className="text-sm" htmlFor="name">
            Name <small className=" ml-1 text-gray-400">(optional)</small>
          </label>
          <input
            id="name"
            type="text"
            ref={nameRef}
            className="p-2 text-xl rounded bg-black border-none outline-none focus-visible:ring-2 ring-fuchsia-500"
          />
        </div>
        <div className="grid gap-1 text-lg">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            ref={emailRef}
            className="p-2 text-xl rounded bg-black border-none outline-none focus-visible:ring-2 ring-fuchsia-500"
          />
        </div>
        <div className="grid gap-1 text-lg relative">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            ref={pwdRef}
            type={isPasswordVisible ? "text" : "password"}
            className="p-2 text-xl rounded bg-black border-none outline-none focus-visible:ring-2 ring-fuchsia-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            title={isPasswordVisible ? "Hide password" : "Show password"}
            className="absolute right-2 bottom-[7px] cursor-pointer rounded hover:bg-gray-600/40 transition-all ease-in p-1"
          >
            {isPasswordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
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
                className="w-5 h-5"
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
        <div className="grid gap-1 text-lg relative">
          <label className="text-sm" htmlFor="confirm">
            Confirm Password
          </label>
          <input
            id="confirm"
            ref={confirmRef}
            type={isPasswordVisible ? "text" : "password"}
            className="p-2 text-xl rounded bg-black border-none outline-none focus-visible:ring-2 ring-fuchsia-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            title={isPasswordVisible ? "Hide password" : "Show password"}
            className="absolute right-2 bottom-[7px] cursor-pointer rounded hover:bg-gray-600/40 transition-all ease-in p-1"
          >
            {isPasswordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
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
                className="w-5 h-5"
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
        <div className="flex items-center gap-3 col-span-2">
          <input
            type="checkbox"
            id="login"
            defaultChecked
            ref={loginRef}
            className="bg-amber-50 hover:bg-amber-400 cursor-pointer
            w-6 h-6 border-3 border-rose-500 rounded-full checked:bg-emerald-500 hover:checked:bg-fuchsia-600"
          />
          <label htmlFor="login">Login Directly?</label>
        </div>
        <button className="p-2 border-none outline-none bg-amber-500 hover:bg-amber-600 rounded font-bold text-xl transition-all ease-out focus-visible:ring-4 focus-visible:bg-transparent ring-amber-700 focus-visible:text-amber-700 active:scale-95 col-span-2">
          Submit
        </button>
      </form>
    </main>
  )
}

export default SignupPage
