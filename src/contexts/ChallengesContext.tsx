import {createContext, ReactNode, useState} from 'react';
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

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setAtiveChallenge(challenge);
    }

    function resetChallenge(){
        setAtiveChallenge(null);
    }

    return (
        <ChallengeContext.Provider value={{level, currentExperience, challengesCompleted, levelUp, startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel}}>
            {children}
        </ChallengeContext.Provider>
    )
}
