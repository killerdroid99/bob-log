import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { useHover } from "ahooks"
import { useRef, useState } from "react"
import InfoCard from "../components/InfoCard"
import PostCard from "../components/PostCard"

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
        {posts.map((post) => (
          // <Link
          //   ref={postCardRef}
          //   key={post.id}
          //   to={`/post/${post.id}`}
          //   className="bg-gray-50/10 hover:bg-gray-300/20 outline-none border-none focus-visible:bg-gray-300/20 focus-visible:ring-1 p-4 rounded-sm flex justify-between items-center relative"
          // >
          //   <h3 className="text-xl font-bold text-purple-50">{post.title}</h3>
          //   <time className="text-amber-50">
          //     {format(new Date(post.createdAt), "h a, dd MMM, yy")}
          //   </time>

          //   <InfoCard
          //     title={post.title}
          //     body="sdjafjsdjf ksdaf"
          //     author={post.author.name}
          //     time={format(new Date(post.createdAt), "h:mm")}
          //   />
          // </Link>
          <PostCard key={post.id} {...post} />
        ))}
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
