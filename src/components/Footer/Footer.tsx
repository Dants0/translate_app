import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import styles from './styles.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.f}>
        Translate App

        <div className={styles.logos}>
        <a href="https://github.com/Dants0/" target='_blank'><GitHubLogoIcon width={35} height={100}/></a>
        <a href="https://www.linkedin.com/in/guilherme-góes-8b72531b0/" target='_blank'><LinkedInLogoIcon  width={35} height={100}/></a>
        </div>
    </footer>
  )
}
