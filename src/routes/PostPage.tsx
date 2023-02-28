import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import DeletePostButton from "../components/DeletePostButton"

interface PostData {
  id: string
  title: string
  body: string
  createdAt: string
  author: {
    id: string
    name: string
  }
}

const PostPage = () => {
  const { id } = useParams()

  const { data: post } = useQuery<PostData>({
    queryKey: ["all-posts"],
    queryFn: async () => {
      return await (
        await fetch(`${import.meta.env.VITE_SERVER}/posts/${id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json"
          }
        })
      ).json()
    }
  })

  const { data: authStatus } = useQuery({
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

  if (post && post.id) {
    return (
      <main className="mx-auto max-w-3xl my-8 px-4">
        <article className="grid">
          <h2 className="text-4xl font-bold underline decoration-wavy underline-offset-8 decoration-fuchsia-500 uppercase top-[65px] sm:top-[90px] sticky backdrop-blur-lg py-4">
            {post.title}
          </h2>
          <div className="mt-4 mb-8 flex items-center gap-4">
            {post.author.id === authStatus.id && (
              <>
                <DeletePostButton
                  buttontitle="Delete Post"
                  postid={id as string}
                  className="bg-red-600 rounded-full py-1 px-2 font-bold uppercase"
                />
                <Link
                  to={`/update-post/${id}`}
                  replace
                  className="bg-amber-600 rounded-full py-1 px-2 font-bold uppercase"
                >
                  Update Post
                </Link>
              </>
            )}

            <div
              className={`text-fuchsia-500 ring-2 ring-fuchsia-500 rounded-full py-1 px-2 font-bold uppercase cursor-default ${
                post.author.id === authStatus.id &&
                "text-green-500 ring-green-500"
              }`}
            >
              {post.author.id === authStatus.id
                ? "your post"
                : `written by ${post.author.name}`}
            </div>
          </div>
          <p className="text-lg first-letter:text-8xl first-letter:float-left first-letter:leading-[4.75rem] first-letter:pr-2 first-letter:font-semibold first-letter:uppercase first-letter:text-fuchsia-500">
            {post.body}
          </p>
        </article>
      </main>
    )
  } else
    return (
      <main className="mx-auto max-w-3xl my-8 px-4">
        <h2 className="text-2xl text-center font-bold">No data</h2>
      </main>
    )
}

export default PostPage
