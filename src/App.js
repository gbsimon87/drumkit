import { useEffect, useState } from 'react';

import useAudio from './hooks/useAudio';

import bank_a_kick from "./drum_samples/bank_a_kick.wav";
import bank_a_hat from "./drum_samples/bank_a_hat.wav";
import bank_a_snare from "./drum_samples/bank_a_snare.wav";
import bank_a_clap from "./drum_samples/bank_a_clap.wav";
import bank_b_kick from "./drum_samples/bank_b_kick.wav";
import bank_b_hat from "./drum_samples/bank_b_hat.wav";
import bank_b_snare from "./drum_samples/bank_b_snare.wav";
import bank_b_clap from "./drum_samples/bank_b_clap.wav";

import './App.css';

function App() {
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [selectedSound, setSelectedSound] = useState(null);
  const [currentVolume, setCurrentVolume] = useState(50);
  const [currentBank, setCurrentBank] = useState("a");

  const data = [
    {
      fileLocation: "./drum_samples/Kick.wav",
      banks: {
        a: useAudio(bank_a_kick, { volume: (currentVolume / 100), playbackRate: 1 }),
        b: useAudio(bank_b_kick, { volume: 0.8, playbackRate: 1 }),
      },
      letter: "q",
      name: "Kick",
    },
    {
      fileLocation: "./drum_samples/Hat.wav",
      banks: {
        a: useAudio(bank_a_hat, { volume: (currentVolume / 100), playbackRate: 1 }),
        b: useAudio(bank_b_hat, { volume: (currentVolume / 100), playbackRate: 1 }),
      },
      letter: "w",
      name: "Hat",
    },
    {
      fileLocation: "./drum_samples/Snare.wav",
      banks: {
        a: useAudio(bank_a_snare, { volume: (currentVolume / 100), playbackRate: 1 }),
        b: useAudio(bank_b_snare, { volume: (currentVolume / 100), playbackRate: 1 }),
      },
      letter: "a",
      name: "Snare",
    },
    {
      fileLocation: "./drum_samples/Clap.wav",
      banks: {
        a: useAudio(bank_a_clap, { volume: (currentVolume / 100), playbackRate: 1 }),
        b: useAudio(bank_b_clap, { volume: (currentVolume / 100), playbackRate: 1 }),
      },
      letter: "s",
      name: "Clap",
    },
  ];

  useEffect(() => {
    window.addEventListener("keydown", function ({ key }) {
      const item = data.filter(dataItem => dataItem.letter === key)[0];
      handlePlaySound(item);
    }, true);

    return () => {
      console.log('leaving CDM useEffect');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handlePowerChange = () => {
    if (isPoweredOn) {
      setCurrentVolume(0);
      setSelectedSound(null);
      setCurrentBank("");
    }

    if (!isPoweredOn) {
      setCurrentVolume(50);
      setCurrentBank("a");
    }

    setIsPoweredOn(!isPoweredOn);
  }

  const handleBankChange = (event) => {
    console.log(event.target);
    if (currentBank === "a") {
      setCurrentBank("b");
    }

    if (currentBank === "b") {
      setCurrentBank("a");
    }
  }

  const handleVolumeInput = (event) => { setCurrentVolume(event.target.value); }

  const handlePlaySound = (dataItem) => {
    if (!dataItem || Object.keys(dataItem).length === 0) return;

    dataItem.banks[currentBank].play();
    setSelectedSound(dataItem.name);
  }

  return (
    <div className="App">
      <div className="power_container">
        <label className="switch">
          <input type="checkbox" onChange={handlePowerChange} checked={isPoweredOn} />
          <span className="slider"></span>
        </label>
      </div>
      <div className="drums_container">
        {
          data && data.length > 0 && data.map(dataItem => {
            return (
              <button
                key={dataItem.letter}
                className="drums_container__button"
                onClick={() => handlePlaySound(dataItem)}
                disabled={!isPoweredOn}
              >
                <div className="drums_container__button--name">{dataItem.name}</div>
                <br />
                <div className="drums_container__button--letter">{dataItem.letter}</div>
              </button>
            )
          })
        }
      </div>
      <div className="name_display_container"><span>{isPoweredOn ? selectedSound : ""}</span></div>
      <div className="volume__container">
        <input
          type="range"
          min="1"
          max="100"
          value={currentVolume}
          onInput={handleVolumeInput}
          className="volume_range"
          id="volume_range"
          disabled={!isPoweredOn}
        />
        <span className="volume_container__display">{currentVolume}</span>
      </div>
      <div className="bank_container">
        <div
          className={`bank bank_a ${isPoweredOn ? "" : "disabled"} ${currentBank === 'a' ? "selected" : ""}`}
          onClick={handleBankChange}>
          A
        </div>
        <div
          className={`bank bank_b ${isPoweredOn ? "" : "disabled"}  ${currentBank === 'b' ? "selected" : ""}`}
          onClick={handleBankChange}>
          B
        </div>
      </div>
    </div >
  );
}

export default App;
