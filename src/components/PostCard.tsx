import { useHover } from "ahooks"
import { useRef } from "react"
import { Link } from "react-router-dom"
import InfoCard from "./InfoCard"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

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

      <AnimatePresence>
        {isHovering && (
          <motion.div
            key="info"
            className={`absolute top-[5%] left-[30%] bg-zinc-900 p-4 rounded-xl ring-1 ring-slate-800 transition-all ease-in z-10 shadow-sm shadow-slate-500 w-80`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            // transition={{ type: "spring" }}
          >
            <InfoCard
              title={props.title}
              body={props.body as string}
              author={props.author.name}
              time={format(new Date(props.createdAt), "h:mm a, E")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  )
}

export default PostCard
