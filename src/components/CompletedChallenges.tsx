import styles from '../styles/components/CompletedChallengs.module.css'

export function CompletedChallenge() {
    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>5</span>
        </div>
    )
}
