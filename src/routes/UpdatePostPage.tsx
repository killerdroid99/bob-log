import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface PostData {
  id: string
  title: string
  body: string
  createdAt: string
}

const UpdatePostPage = () => {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { id } = useParams()

  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const { mutateAsync, isError } = useMutation({
    mutationFn: async () => {
      return await (
        await fetch(`${import.meta.env.VITE_SERVER}/posts/${id}`, {
          body: JSON.stringify({
            title: titleRef.current?.value,
            body: bodyRef.current?.value
          }),
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          }
        })
      ).json()
    }
  })

  const { data: post, isLoading } = useQuery<PostData>({
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

  useEffect(() => {
    if (!isLoading) {
      titleRef.current!.value = post!.title
      bodyRef.current!.value = post!.body
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await mutateAsync()
      if (!isError) {
        navigate("/", {
          preventScrollReset: true,
          replace: true
        })
        // qc.invalidateQueries(["all-posts"])
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
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            ref={titleRef}
            className="p-2 text-xl rounded bg-black border-none outline-none focus-visible:ring-2 ring-fuchsia-500"
          />
        </div>
        <div className="grid gap-1 text-lg relative">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            ref={bodyRef}
            rows={10}
            className="p-2 text-xl rounded bg-black border-none outline-none focus-visible:ring-2 ring-fuchsia-500 resize-none"
          />
        </div>
        <button className="p-2 border-none outline-none bg-teal-500 hover:bg-teal-600 rounded font-bold text-xl transition-all ease-out focus-visible:ring-4 focus-visible:bg-transparent ring-teal-700 focus-visible:text-teal-700 active:scale-95">
          Save Changes
        </button>
      </form>
      <p className="text-gray-400 text-xs text-right">Post id: {id}</p>
    </main>
  )
}

export default UpdatePostPage
