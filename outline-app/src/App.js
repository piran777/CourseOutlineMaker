import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';



class App extends Component {
  state = {
    name: '',
    cTitle: '',
    year: '',
    desc: '',
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'CourseOutline.pdf');
      })
  }

  render() {
    return (
      <div className="App">
        <input type="text" placeholder="XXXXA/B" name="name" onChange={this.handleChange}/>
        <input type="text" placeholder="Course Title" name="cTitle" onChange={this.handleChange} />
        <input type="text" placeholder="20YY-YY" name="year" onChange={this.handleChange} />
        <textarea type="text" placeholder="Description" name="desc" onChange={this.handleChange} />
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default App;
