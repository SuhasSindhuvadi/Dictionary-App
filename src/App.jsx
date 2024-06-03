import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchDefinition = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setData(response.data[0]);
      setError('');
    } catch (err) {
      setError('Definition not found');
      setData(null);
    }
  };

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim()) {
      fetchDefinition();
    }
  };

  return (
    <div className="app">
      <h1>Dictionary</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={word}
          onChange={handleInputChange}
          placeholder="Enter a word"
          className="input"
        />
        <button type="submit" className="button">Get Definition</button>
      </form>
      {data && (
        <div className="result">
          {data.meanings && data.meanings.find(meaning => meaning.partOfSpeech === 'noun') && (
            <div>
              <p><strong>Definition:</strong> {
                data.meanings.find(meaning => meaning.partOfSpeech === 'noun').definitions[2].definition
              }</p>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
