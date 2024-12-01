import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Text.css"
import image from './play.png'

const TextToSpeech = () => {
  const [speech] = useState(new SpeechSynthesisUtterance());
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
        speech.voice = availableVoices[0];
      }
    };

    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    handleVoicesChanged();
  }, [speech]);

  const handleVoiceChange = (event) => {
    const selectedVoiceName = event.target.value;
    setSelectedVoice(selectedVoiceName);
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
    speech.voice = selectedVoice;
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleListen = () => {
    speech.text = text;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="hero">
      <h1>Text to Speech Converter</h1>
      <textarea
        placeholder="Write anything here ...."
        value={text}
        onChange={handleTextChange}
      />
      <div className="row">
        <select value={selectedVoice} onChange={handleVoiceChange}>
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
        <button onClick={handleListen}> <img src={image}></img>Listen</button>
       
      </div>
      <Link to="/speech">
        <button className='navi'>Go to Speech to Text</button>
      </Link>
    </div>
  );
};

export default TextToSpeech;
