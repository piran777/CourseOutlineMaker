import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const MainPage = () => {
  const [pdfBlob, setPdfBlob] = useState(null);

  const getPDF = async () => {
    try {
      const res = await axios.get('/fetch-pdf', { responseType: 'blob' });
      setPdfBlob(new Blob([res.data], { type: 'application/pdf' }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={getPDF}>View PDF</button>
      {pdfBlob && (
        <a
          href={URL.createObjectURL(pdfBlob)}
          target="_blank"
          rel="noopener noreferrer"
          download="CourseOutline.pdf"
        >
          Download PDF
        </a>
      )}
    </div>
  );
};

export default MainPage;




