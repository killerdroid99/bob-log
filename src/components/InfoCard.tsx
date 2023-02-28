interface IProps {
  title: string
  body: string
  author: string
  time: string
}

const InfoCard = ({ title, body, author, time }: IProps) => {
  return (
    <div
      className={`absolute top-[5%] left-[30%] bg-zinc-900 p-4 rounded-xl ring-1 ring-slate-800 transition-all ease-in z-10 shadow-sm shadow-slate-500 w-80`}
    >
      <h3 className="text-2xl font-extrabold capitalize text-sky-500/60">
        {title}
      </h3>
      <p className="pl-2">
        {body.length > 50 ? (
          body.slice(0, 50) + "..."
        ) : body.length === 0 ? (
          <span className="text-zinc-500">No Body provided 😢</span>
        ) : (
          body
        )}
      </p>
      <div className="text-xs capitalize text-slate-400 mt-2 text-right">
        {author} · {time}
      </div>
    </div>
  )
}

export default InfoCard
