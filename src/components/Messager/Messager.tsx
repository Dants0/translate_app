/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MessagerIn } from "../../interfaces/Message";
import axios from "axios";
import styles from "./styles.module.scss";
import { TranslatorIn } from "../../interfaces/Translator";
import spinner from "../../assets/Eclipse-0.6s-214px.svg";
import TextSpeech from "../TextSpeech/TextSpeech";
import { Copy } from "lucide-react";
import { DarkThemeToggle } from "../DarkThemeToogle/DarkThemeToogle";

export const Messager = () => {
  const [message, setMessage] = useState<MessagerIn | null>(null);
  const [translator, setTranslator] = useState<TranslatorIn | any>({
    data: "",
    translatedText: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [copyTranslations, setCopyTranslations] = useState(false);

  async function translateMessage() {
    if (message === null) {
      return;
    }

    setLoading(true);

    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", "en");
    encodedParams.set("target_language", "pt");
    encodedParams.set("text", message.message);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setTranslator(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = () => {
    const textToCopy = translator.data.translatedText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyTranslations(true);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <DarkThemeToggle/>
        <div className={styles.leftBox}>
          <TextSpeech text={message?.message} />
          <span>Linguagem: EN</span>
          <textarea
            placeholder="Enviar frase em inglês para traduzir"
            onChange={(e) => setMessage({ message: e.target.value })}
          />
        </div>
        <button onClick={translateMessage} className={styles.translateButton}>
          Traduzir
        </button>
        {loading ? (
          <img src={spinner} alt="Loading..." />
        ) : (
          <div className={styles.boxTranslated}>
            <TextSpeech text={translator.data.translatedText} />
            <Copy
              onClick={copyToClipboard}
              className={styles.copyTranslatedText}
            />
            {!copyTranslations ? ( '' ) : ( <span>Texto Copiado!</span> )}
            <textarea
              value={translator ? translator.data.translatedText : ""}
              readOnly
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
};
