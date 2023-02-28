import { useHover } from "ahooks"
import { useRef } from "react"
import { Link } from "react-router-dom"
import InfoCard from "./InfoCard"
import { format } from "date-fns"

interface IProps {
  id: string
  title: string
  createdAt: string
  body?: string
  author: {
    id: string
    name: string
  }
}

const PostCard = (props: IProps) => {
  const postCardRef = useRef(null)
  const isHovering = useHover(postCardRef)

  return (
    <Link
      ref={postCardRef}
      to={`/post/${props.id}`}
      className="bg-gray-50/10 hover:bg-gray-300/20 outline-none border-none focus-visible:bg-gray-300/20 focus-visible:ring-1 p-4 rounded-sm flex justify-between items-center relative"
    >
      <h3 className="text-xl font-bold text-purple-50 capitalize">
        {props.title}
      </h3>
      <p className="text-amber-50">
        {format(new Date(props.createdAt), "h a, dd MMM, yy")}
      </p>

      {isHovering && (
        <InfoCard
          title={props.title}
          body={props.body as string}
          author={props.author.name}
          time={format(new Date(props.createdAt), "h:mm a, E")}
        />
      )}
    </Link>
  )
}

export default PostCard
