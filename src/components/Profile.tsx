import styles from '../styles/components/Profile.module.css'
import {useContext} from "react";
import {ChallengeContext} from "../contexts/ChallengesContext";

export function Profile() {
    const {level} = useContext(ChallengeContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/Dathin.png" alt="Dathin"/>
            <div>
                <strong>Dathin</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}
