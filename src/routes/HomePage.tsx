import { useQuery } from "@tanstack/react-query"
import PostCard from "../components/PostCard"
import { motion, AnimatePresence } from "framer-motion"

interface Post {
  id: string
  title: string
  createdAt: string
  body?: string
  author: {
    id: string
    name: string
  }
}

const HomePage = () => {
  const {
    data: posts,
    isLoading,
    isFetched
  } = useQuery<Post[]>({
    queryKey: ["all-posts"],
    queryFn: async () => {
      return await (
        await fetch(`${import.meta.env.VITE_SERVER}/posts`, {
          method: "GET",
          headers: {
            "Content-type": "application/json"
          }
        })
      ).json()
    }
  })

  if (posts && posts.length > 0) {
    return (
      <main className="mx-auto max-w-3xl my-8 px-2 sm:px-4 grid gap-8">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PostCard {...post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </main>
    )
  } else if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl my-8 px-4 grid">
        <h1 className="text-center font-bold text-4xl animate-pulse">
          Loading fresh posts 🗞️🗞️🗞️
        </h1>
      </main>
    )
  } else if (isFetched && posts?.length === 0) {
    return (
      <main className="mx-auto max-w-3xl my-8 px-4 grid">
        <h1 className="text-center font-bold text-4xl">No posts found</h1>
      </main>
    )
  }
  return <div></div>
}

export default HomePage
