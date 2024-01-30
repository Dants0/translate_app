/* eslint-disable @typescript-eslint/no-explicit-any */
import { SpeechIn } from "../../interfaces/Speech";
import { useEffect, useState } from "react";
import styles from './styles.module.scss'
import { PlayIcon, PauseIcon, ResumeIcon, StopIcon } from "@radix-ui/react-icons";

const TextSpeech = ({ text }: SpeechIn) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );
  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance!);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  const handleVolumeChange = (event:any) => {
    setVolume(parseFloat(event.target.value));
    if (utterance) {
      utterance.volume = parseFloat(event.target.value);
    }
  };

  const handleRateChange = (event:any) => {
    setRate(parseFloat(event.target.value));
    if (utterance) {
      utterance.rate = parseFloat(event.target.value);
    }
  };
  
  return (
    <div className={styles.textSpeech_container}>
      <label>
        Volume: {volume}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </label>
      <label>
        Velocidade: {rate}
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
      </label>
      <div className={styles.buttons}>
      <button onClick={handlePlay}>{isPaused ? <ResumeIcon color="white"/> : <PlayIcon color="white"/> }</button>
      <button onClick={handlePause}><PauseIcon color="white"/></button>
      <button onClick={handleStop}><StopIcon color="white"/></button>
      </div>
    </div>
  );
};

export default TextSpeech;
