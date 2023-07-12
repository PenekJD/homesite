import { useContext } from 'react';
import UserContext from '../context/UserContext';
import ICardProps from '../interfaces/ICurProps';
import styles from './Card.module.css';

function Card( {val, dec, func}:ICardProps ) {

    let { user, setUser } = useContext(UserContext);

    return(
        <>
            <div className={styles.jsonArea+' code-area'}>{dec}</div>
            <div>{val} <b>{user.fullname}</b> </div>
            <button onClick={ ()=>{ func() } }>test</button>
        </>
    )
}

export default Card;