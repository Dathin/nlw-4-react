import styles from '../styles/components/LevelUpModal.module.css';
import {useContext} from "react";
import {ChallengeContext} from "../contexts/ChallengesContext";


export function LevelUpModal() {
    const {level, closeLevelUpModel} = useContext(ChallengeContext);

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>
                <button type="button" onClick={closeLevelUpModel}>
                    <img src="/icons/close.svg" alt="Fechar modal"/>
                </button>
            </div>
        </div>
    );
}
