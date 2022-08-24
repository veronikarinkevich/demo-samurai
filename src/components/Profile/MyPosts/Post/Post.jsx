
import s from './Post.module.css';
const Post = (props) => {

  
  return (
    <div className={s.item}>
      <img src='https://www.1zoom.ru/big2/946/289597-frederika.jpg' />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>

  )
}



export default Post;