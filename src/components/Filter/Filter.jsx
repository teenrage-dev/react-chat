import css from './Filter.module.css';

import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from 'react-icons/ai';

export const Filter = ({ filter, handleChange }) => {
  return (
    <div className={css.InputFilterContainer}>
      <AiOutlineSearch
        size="2em"
        color="rgb(102, 102, 102)"
        className={css.SearchIcon}
      />
      <DebounceInput
        minLength={1}
        debounceTimeout={500}
        autoFocus
        type="text"
        value={filter}
        placeholder="Search or start new chat"
        onChange={handleChange}
        className={css.InputFilter}
      />
    </div>
  );
};
