import state from '../../redux/store';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { Field, reduxForm } from "redux-form";
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name="newMessageBody" placeholder="Enter your message" 
         validate={[required, maxLength50 ]} />
      </div>
      <div>
        <button>Send</button></div>
    </form>
  )
}

const AddMessageReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
  let messagesElements = state.messages.map(m => <Message message={m.message} />);

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody)
  }
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItem}> 
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElements}
        <div>
          <AddMessageReduxForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>)
}



export default Dialogs;