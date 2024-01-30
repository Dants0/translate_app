import { TypeAnimation } from 'react-type-animation'
import styles from './styles.module.scss'

export const Header = () => {
  return (
    <header className={styles.h}>
        <TypeAnimation
          sequence={[
            "Simple Translate App", 
            10000,
            "Translate Easily App",
            10000
          ]}
          wrapper='span'
          speed={50}
          style={{ fontSize: '2em', display: 'inline-block' }}
          repeat={Infinity}
        />
    </header>
  )
}
