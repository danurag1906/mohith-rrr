import { useState, useEffect } from "react";
import PDFMerger from "pdf-merger-js/browser";
import "./PdfMerger.css";
import {MdPictureAsPdf} from'react-icons/md'
import {BsFillArrowDownSquareFill,BsFillArrowUpSquareFill} from 'react-icons/bs'
import {FaArrowCircleRight} from 'react-icons/fa'


const PdfMerger = () => {

    const [uploadedFiles, setUploadedFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState('');


  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    
    files.forEach((file) => {
      uploaded.push(file)
    });
    setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  
  useEffect(() => {
    const render = async () => {
      const merger = new PDFMerger();

      for (const file of uploadedFiles) {
        await merger.add(file);
      }

      const mergedPdf = await merger.saveAsBlob();
      const url = URL.createObjectURL(mergedPdf);

      return setMergedPdfUrl(url);
    };

    render().catch((err) => {
      throw err;
    });

     setMergedPdfUrl();

  }, [uploadedFiles, setMergedPdfUrl]);



  const handleUp=(name)=>{
    const data=[...uploadedFiles]
    let index;
    
    if(name!==data[0].name){
      for(let i=0;i<data.length;i++){
        if(data[i].name===name){
          index=i;
          break;
        }
      }
      let temp=data[index];
      data[index]=data[index-1];
      data[index-1]=temp;
      setUploadedFiles(data)
    }
  }

  const handleDown=(name)=>{
    const data=[...uploadedFiles]
    let index;
    
    if(name!==data[data.length-1].name){
      for(let i=0;i<data.length;i++){
        if(data[i].name===name){
          index=i;
          break;
        }
      }

      [data[index],data[index+1]]=[data[index+1],data[index]]
      setUploadedFiles(data)
    }
  }

  return (
    <div className="App">
      <div className="header">
      <h4 className="mb-4 p-2" >PDF-Merger</h4>
      </div>
      <div className="instructions">
        <p><FaArrowCircleRight/> To change the order of PDF files use arrow buttons.</p>
        <p><FaArrowCircleRight/> Refresh to clear data.</p>
      </div>
      
      <div className="buttons">
      <input
        
        id="fileUpload"
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileEvent}
      />
        <a className="btn btn-warning my-2 mx-2"  href={`${mergedPdfUrl}`} download >Merge Files</a>
      </div>
      

      {!mergedPdfUrl?(
        <p className="danger" >Loading...</p>
      ):(
        
        <div className="uploaded-files-list">
        {uploadedFiles.map((file) => (
          <div className="eachFile" > <MdPictureAsPdf/> {file.name} <div className="arrows"><BsFillArrowUpSquareFill className="mx-2" onClick={()=>handleUp(file.name)} /><BsFillArrowDownSquareFill onClick={()=>handleDown(file.name)} /></div> </div>
        ))}
        </div>
        
      )}

      

    </div>
  )
}

export default PdfMerger