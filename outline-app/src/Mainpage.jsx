import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const MainPage = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/fetch-pdf-files');
        setPdfFiles(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const getPDF = async (file) => {
    try {
      const res = await axios.get(`/fetch-pdf/${file.id}`, { responseType: 'blob' });
      setPdfBlob(new Blob([res.data], { type: 'application/pdf' }));
      setSelectedFile(file);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFiles = pdfFiles.filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <input type="text" placeholder="Search for PDF" value={searchTerm} onChange={handleSearch} />
      <ul>
        {filteredFiles.map(file => (
          <li key={file.id}>
            <button onClick={() => getPDF(file)}>{file.name}</button>
          </li>
        ))}
      </ul>
      {selectedFile && (
        <a
          href={URL.createObjectURL(pdfBlob)}
          target="_blank"
          rel="noopener noreferrer"
          download={`${selectedFile.name}.pdf`}
        >
          Download PDF
        </a>
      )}
    </div>
  );
};

export default MainPage;
