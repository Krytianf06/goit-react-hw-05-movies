import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from 'service/service';
import Review from 'components/Review';
import s from './Reviews.module.css';

export default function Reviews() {
  const [reviews, setReviews] = useState('');
  const { movieID } = useParams();

  useEffect(() => {
    fetchReviews(movieID).then(res => {
      res.results.length !== 0 ? setReviews(res.results) : setReviews('');
    });
  }, [movieID]);

  return (
    <ul>
      {reviews ? (
        reviews.map(({ author, content }, index) => {
          return (
            <li key={index} className={s.reviewItem}>
              <Review author={author} content={content} />
            </li>
          );
        })
      ) : (
        <p>No reviews for this movie</p>
      )}
    </ul>
  );
}
