import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const MyPosts = React.memo((props) => {
  let postsElements = [...props.posts]
  .reverse()
  .map(p => <Post message={p.message} likesCount={p.likesCount} />);

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  }

  return <div className={s.postsBlock}>
    <h2>My posts</h2>
    <AddPostReduxForm onSubmit={onAddPost}/>
    <div className={s.posts}>
      {postsElements}
    </div>
  </div>
})

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <div>
          <Field component={Textarea} name="newPostText" placeholder="Post message"
          validate={[required, maxLength10 ]} />
        <button>Add post</button>
      </div>
    </form>
  )
}

const AddPostReduxForm = reduxForm({ form: 'profileAddPostForm' })(AddPostForm)

export default MyPosts;