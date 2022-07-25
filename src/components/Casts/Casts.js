import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from 'service/service';
import Cast from 'components/Cast/Cast';
import s from './Casts.module.css';

export default function Casts() {
  const [casts, setCasts] = useState([]);
  const { movieID } = useParams();

  useEffect(() => {
    fetchCast(movieID).then(res => {
      if (res.cast?.length === 0) {
        setCasts(null);
        return;
      }
      setCasts(res.cast);
    });
  }, [movieID]);

  return (
    <ul className={s.castsList}>
      {casts !== null ? (
        casts?.map(({ name, character, profile_path }, index) => {
          return (
            <li key={index} className={s.castItem}>
              <Cast name={name} character={character} src={profile_path} />
            </li>
          );
        })
      ) : (
        <p>No information about casts</p>
      )}
    </ul>
  );
}
