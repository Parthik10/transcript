import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState } from "react";
import { Link } from 'react-router-dom';
import "./Speechtotxt.css";

function Speech() {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000
  });

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const clearText = () => {
    resetTranscript();
    setTextToCopy(""); 
  };

  return (
    <div className="container">
      <h2>Speech to Text Converter</h2>
      <p>A convenient tool that transforms your spoken words into text, ready for your help.</p>
      <div className="main-content" onClick={() => setTextToCopy(transcript)}>
        {transcript}
      </div>
      <div className="btn-style">
        <button onClick={setCopied}>
          {isCopied ? 'Copied!' : 'Copy to clipboard'}
        </button>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
        <button onClick={clearText}>Clear</button>
      </div>
      <Link to="/">
        <button className='navi'>Go to Text to Speech</button>
      </Link>
    </div>
  );
}

export default Speech;
