import './styles.css'
export const PostCard = ({id, title, body, cover}) => {
    return (
        <div className='post' key={id}>
        <img src={cover} alt={title} />
        <div className='post-content'>
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
      </div>
    )
}