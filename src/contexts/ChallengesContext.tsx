import {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
    children: ReactNode;
}

interface ChallengesContextData {
    level: number,
    currentExperience: number,
    experienceToNextLevel: number,
    challengesCompleted: number,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    activeChallenge: {
        type: 'body' | 'eye';
        description: string;
        amount: number;
    }
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setAtiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    useEffect(() => {
        Notification.requestPermission();
    }, []);


    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setAtiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted'){
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp`
            })
        }
    }

    function resetChallenge(){
        setAtiveChallenge(null);
    }

    function completeChallenge(){
        if (!activeChallenge) return;

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setAtiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengeContext.Provider value={{level, currentExperience, challengesCompleted, levelUp, startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel, completeChallenge}}>
            {children}
        </ChallengeContext.Provider>
    )
}
