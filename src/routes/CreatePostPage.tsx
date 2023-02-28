import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FormEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const CreatePostPage = () => {
  const navigate = useNavigate()
  const qc = useQueryClient()

  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const { mutateAsync, isError } = useMutation({
    mutationFn: async () => {
      return await (
        await fetch(`${import.meta.env.VITE_SERVER}/posts`, {
          body: JSON.stringify({
            title: titleRef.current?.value,
            body: bodyRef.current?.value
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
        qc.invalidateQueries(["all-posts"])
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
        <button className="p-2 border-none outline-none bg-indigo-500 hover:bg-indigo-600 rounded font-bold text-xl transition-all ease-out focus-visible:ring-4 focus-visible:bg-transparent ring-indigo-700 focus-visible:text-indigo-700 active:scale-95">
          Submit
        </button>
      </form>
    </main>
  )
}

export default CreatePostPage
