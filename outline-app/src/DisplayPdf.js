/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayPdf = () => {
  const [pdfName, setPdfName] = useState('');
  const [pdfData, setPdfData] = useState(null);
  const [outlineData, setOutlineData] = useState([]);

  const handleChange = event => {
    setPdfName(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await axios.get(`/getOutline/${pdfName}`);
    setPdfData(response.data);
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          PDF Name:
          <input type="text" value={pdfName} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DisplayPdf;*/


import React, { useState, useEffect } from 'react';

const DisplayPdf = () => {
  const [outlineData, setOutlineData] = useState([]);
  const [pdfName, setPdfName] = useState('');

  useEffect(() => {
    if (pdfName) {
      fetch(`/getOutline/${pdfName}`)
        .then(response => response.json())
        .then(data => setOutlineData(data));
    }
  }, [pdfName]);

  const handleSubmit = event => {
    event.preventDefault();
    setPdfName(event.target.elements.value.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="value"/>
        <button type="submit">Submit</button>
      </form>
      {outlineData.map(data => (
        <div key={data.value}>
          <p>Value: {data.code}</p>
          <p>Outline Data: {data.course}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayPdf;
