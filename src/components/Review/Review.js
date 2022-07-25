import s from './Review.module.css';

export default function Review({ author, content }) {
  return (
    <>
      <p className={s.author}>{author}</p>
      <p>{content}</p>
    </>
  );
}
