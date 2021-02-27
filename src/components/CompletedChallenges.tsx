import styles from '../styles/components/CompletedChallengs.module.css'
import {useContext} from "react";
import {ChallengeContext} from "../contexts/ChallengesContext";

export function CompletedChallenge() {

    const {challengesCompleted} = useContext(ChallengeContext);

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}
