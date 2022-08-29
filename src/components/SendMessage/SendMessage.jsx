import css from './SendMessage.module.css';

import { MdOutlineSend } from 'react-icons/md';

export const SendMessage = ({ handleSubmit, text, setText }) => {
  return (
    <div className={css.SendMessageContainer}>
      <form onSubmit={handleSubmit} className={css.Form}>
        <div className={css.CustomInput}>
          <input
            autoFocus
            type="text"
            className={css.Input}
            value={text}
            placeholder="Type your message"
            onChange={e => setText(e.target.value)}
          />
          <button className={css.Button} type="submit">
            <MdOutlineSend className={css.ButtonIco} size="2em" />
          </button>
        </div>
      </form>
    </div>
  );
};
