import { useState } from 'react';
import s from './SearchForm.module.css';

export default function SearchForm({ setSearchParams }) {
  const [inputVal, setInputVal] = useState('');

  const handleInputChange = evt => {
    setInputVal(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (!inputVal.trim()) {
      alert('Enter correct title');
      return;
    }

    const queryString = inputVal.trim().split(' ').join('+');
    setSearchParams({ query: queryString });
    setInputVal('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        className={s.input}
        type="text"
        onChange={handleInputChange}
        name="searchPhrase"
        value={inputVal}
        autoFocus
      />
      <button className={s.btn} type="submit">
        Search
      </button>
    </form>
  );
}
