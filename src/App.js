
import {Routes,Route} from 'react-router-dom'
import "./App.css";
import CropPdf from "./Components/CropPdf";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import OCRText from "./Components/OCRText";
import PdfMerger from "./Components/PdfMerger";

function App() {

  return ( 
    <div className="App">
      <Header />
      <Nav/>
        <Routes>
          <Route exact path="/" element={<PdfMerger/>} />
          <Route exact path="/ocrtext" element={<OCRText/>} />
          <Route exact path="/croppdf" element={<CropPdf/>} />
        </Routes>
    </div>
  );
}



export default App;
