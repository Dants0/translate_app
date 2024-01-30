import { Footer } from "../components/Footer/Footer"
import { Header } from "../components/Header/Header"
import { Messager } from "../components/Messager/Messager"

import styles from './styles.module.scss'

export const Home = () => {
  return (
    <div className={styles.page_container}>
        <Header/>
        <Messager/>
        <Footer/>
    </div>
  )
}
