import css from './Message.module.css';

export const Message = () => {
  return (
    <div className={css.Message}>
      <div className={css.Message_Box}>
        <p>Dave</p>
        <p>I'm learning React</p>
      </div>
    </div>
  );
};
