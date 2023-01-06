import React from "react";
import { useState } from "react";
import Tesseract from "tesseract.js";
import "./OCRText.css";
import {FaArrowCircleRight} from 'react-icons/fa'

const OCRText = () => {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [isLoading,setIsLoading]=useState(false)

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  const handleClick = () => {
    setIsLoading(true)
    Tesseract.recognize(imagePath, "eng", {
    //   logger: (m) => console.log(m),
    })
    .then(({ data: { text } }) => {
        setIsLoading(false)
        setText(text)
      })
  };

  return (
    <div className="App">
        <h5 className="heading" >(OCR-Text) Extract text from images</h5>
        <div className="instructions">
            <p><FaArrowCircleRight/> Select a high quality (Resolution) image.</p>
            <p><FaArrowCircleRight/> Accuracy of text extracted depends on image quality.</p>
            <p><FaArrowCircleRight/> Refresh to clear data</p>
        </div>
        <div className="buttons">
          <input type="file" onChange={handleChange} />
          <button onClick={handleClick} >
            convert to text
          </button>
        </div>
      <main className="App-main">
        <div className="image-div">
          <h5>Actual image uploaded</h5>
          <img src={imagePath} className="App-logo" alt="logo" />
        </div>

        <div className="text-box">
          <h5>Extracted text</h5>
          {isLoading && "Loading..."}
          {!isLoading && <p> {text} </p> }
        </div>
        
      </main>
    </div>
  );
};

export default OCRText;
