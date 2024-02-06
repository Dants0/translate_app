import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.f}>
      Translate App
      <div className={styles.logos}>
        <a href="https://github.com/Dants0/" target="_blank">
          <GitHubLogoIcon width={35} height={100} color="white" />
        </a>
        <a href="https://ko-fi.com/nosensee" target="_blank" rel="noreferrer">
          <img
            height="36"
            style={{
              border: "none",
              width: "100%",
            }}
            src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/guilherme-góes-8b72531b0/"
          target="_blank"
        >
          <LinkedInLogoIcon color="white" width={35} height={100} />
        </a>
      </div>
    </footer>
  );
};
