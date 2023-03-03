import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useScroll, motion } from "framer-motion"
import { NavLink } from "react-router-dom"

const Header = () => {
  const qc = useQueryClient()
  const { scrollYProgress } = useScroll()

  const { data } = useQuery({
    queryKey: ["auth-status"],
    queryFn: async () => {
      return await (
        await fetch(`${import.meta.env.VITE_SERVER}/auth/status`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          }
        })
      ).json()
    }
  })

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      return await (
        await fetch(`${import.meta.env.VITE_SERVER}/auth/logout`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          }
        })
      ).json()
    }
  })

  const handleLogout = async () => {
    try {
      await mutateAsync()
      qc.invalidateQueries(["auth-status"])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="flex items-center justify-between md:py-8 lg:px-[18dvw] md:px-16 px-4 py-4 sticky top-0 bg-transparent backdrop-blur-md z-50 ">
      <NavLink to={"/"}>
        <h2 className="text-2xl font-bold group">
          <span className="text-sky-500 group-hover:text-white transition-colors ease">
            Bob
          </span>{" "}
          <span className="group-hover:text-sky-500 transition-colors ease">
            Log
          </span>
        </h2>
      </NavLink>

      <nav className="flex gap-[1.5dvw] items-center text-lg">
        {data && data.id ? (
          <>
            <span className="capitalize font-bold text-xl">{data.name}</span>
            <NavLink
              to={"/create-post"}
              className="py-1 px-2 border-none outline-none bg-indigo-500 hover:bg-indigo-600 rounded font-bold transition-all ease-out focus-visible:ring-4 focus-visible:bg-transparent ring-indigo-700 focus-visible:text-indigo-700 active:scale-95"
            >
              Create Post
            </NavLink>
            <button
              onClick={handleLogout}
              className="py-1 px-2 border-none outline-none bg-red-500 hover:bg-red-600 rounded font-bold transition-all ease-out focus-visible:ring-4 focus-visible:bg-transparent ring-red-700 focus-visible:text-red-700 active:scale-95"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to={"/login"}
              className="py-1 px-2 border-none outline-none bg-emerald-500 hover:bg-emerald-600 rounded font-bold transition-all ease-out focus-visible:ring-4 focus-visible:bg-transparent ring-emerald-700 focus-visible:text-emerald-700 active:scale-95"
            >
              Login
            </NavLink>
            <NavLink
              to={"/signup"}
              className="py-1 px-2 border-none outline-none bg-fuchsia-500 hover:bg-fuchsia-600 rounded font-bold transition-all ease-out focus-visible:ring-4 focus-visible:bg-transparent ring-fuchsia-700 focus-visible:text-fuchsia-700 active:scale-95"
            >
              Signup
            </NavLink>
          </>
        )}
      </nav>
      <motion.div
        style={{ opacity: scrollYProgress }}
        className="bg-white/20 absolute w-full h-px bottom-0 left-0 overflow-hidden"
      ></motion.div>
    </header>
  )
}

export default Header
