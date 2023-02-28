import { useMutation, useQueryClient } from "@tanstack/react-query"
import { HTMLAttributes, LegacyRef, forwardRef } from "react"
import { useNavigate } from "react-router-dom"

interface IProps {
  buttontitle: string
  postid: string
  className: string
}

const DeletePostButton = forwardRef(
  (props: IProps, ref: LegacyRef<HTMLButtonElement>) => {
    const navigate = useNavigate()
    const qc = useQueryClient()
    const { mutateAsync, isError } = useMutation({
      mutationFn: async () => {
        return await (
          await fetch(`${import.meta.env.VITE_SERVER}/posts/${props.postid}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-type": "application/json"
            }
          })
        ).json()
      }
    })

    const handleClick = async () => {
      try {
        if (window.confirm("Delete this post?")) {
          await mutateAsync()
          if (!isError) {
            navigate("/", {
              preventScrollReset: true,
              replace: true
            })
            // qc.invalidateQueries(["all-posts"])
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <button {...props} onClick={handleClick} ref={ref}>
        {props.buttontitle}
      </button>
    )
  }
)

export default DeletePostButton
