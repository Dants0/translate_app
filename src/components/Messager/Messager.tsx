import { useState } from "react";
import { MessagerIn } from "../../interfaces/Message";
import axios from "axios";
import styles from "./styles.module.scss";
import { TranslatorIn } from "../../interfaces/Translator";
import spinner from "../../assets/Eclipse-0.6s-214px.svg";
import TextSpeech from "../TextSpeech/TextSpeech";

export const Messager = () => {
  const [message, setMessage] = useState<MessagerIn | null>(null);
  const [translator, setTranslator] = useState<TranslatorIn | any>({
    data: "",
    translatedText: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftBox}>
        <TextSpeech text={message?.message} />
          <textarea
            placeholder="Enviar frase em inglês para traduzir"
            onChange={(e) => setMessage({ message: e.target.value })}
          />
        </div>
        <button onClick={translateMessage} className={styles.translateButton}>Traduzir</button>
        {loading ? (
          <img src={spinner} alt="Loading..." />
        ) : (
          <div className={styles.boxTranslated}>
            <TextSpeech text={translator.data.translatedText} />
            <textarea
              value={translator ? translator.data.translatedText : ""}
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
};
