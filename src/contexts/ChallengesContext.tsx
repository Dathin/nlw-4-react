import Cookies from 'js-cookie';
import {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from '../../challenges.json';
import {LevelUpModal} from "../components/LevelUpModal";

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
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
    closeLevelUpModel: () => void,
    activeChallenge: {
        type: 'body' | 'eye';
        description: string;
        amount: number;
    }
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 1);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 1);
    const [activeChallenge, setAtiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModel() {
        setIsLevelUpModalOpen(false);
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
        <ChallengeContext.Provider value={{level, currentExperience, challengesCompleted, levelUp, startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel, completeChallenge, closeLevelUpModel}}>
            {children}
            { isLevelUpModalOpen && <LevelUpModal/> }
        </ChallengeContext.Provider>
    )
}
