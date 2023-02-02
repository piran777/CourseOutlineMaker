import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

export default function Mainpage(){
    const getPDF = async () => {
        try {
            const response = await axios.get('/fetch-pdf', { responseType: 'blob' })
            .then(function (response){
                data = response.data;
            })
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div>
            <button onClick={getPDF}>
                View PDF
            </button>
        </div>

    )
}



