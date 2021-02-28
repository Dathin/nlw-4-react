import {ExperienceBar} from "../components/ExperienceBar";
import {Profile} from "../components/Profile";

import styles from '../styles/pages/Home.module.css'
import {CompletedChallenge} from "../components/CompletedChallenges";
import {Countdown} from "../components/Countdown";

import Head from 'next/head';
import {ChallengeBox} from "../components/ChallengeBox";
import {CountdownProvider} from "../contexts/CountdownContext";


export default function Home() {
  return (
      <div className={styles.container}>
          <Head>
              <title>Inicio | Moveit</title>
          </Head>
          <ExperienceBar/>
          <CountdownProvider>
              <section>
                  <div>
                      <Profile/>
                      <CompletedChallenge/>
                      <Countdown/>
                  </div>
                  <div>
                      <ChallengeBox/>
                  </div>
              </section>
          </CountdownProvider>
      </div>
  )
}
