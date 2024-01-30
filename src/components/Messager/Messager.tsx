import { useState } from "react";
import { MessagerIn } from "../../interfaces/Message";
import axios from "axios";
import styles from "./styles.module.scss";
import { TranslatorIn } from "../../interfaces/Translator";
import spinner from "../../assets/90-ring.svg";

export const Messager = () => {
  const [message, setMessage] = useState<MessagerIn | null>(null);
  const [translator, setTranslator] = useState<TranslatorIn | any>({
    data: "",
    translatedText: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  // const phrasesArray = [];

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
      <textarea
        placeholder="Enviar frase para traduzir"
        onChange={(e) => setMessage({ message: e.target.value })}
      />
      <button onClick={translateMessage}>Traduzir</button>
      {loading ? (
        <img src={spinner} alt="Loading..." />
      ) : (
        <textarea
          value={translator ? translator.data.translatedText : ""}
          readOnly
        />
      )}
    </div>
  );
};
