import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import ResponsiveAppBar from "./components/Navbar";
// import Members from "./components/Members";
// import MembersDetailPage from "./components/recordDetailpage/MembersDetailPage";
import HomePage from "./Components/HomePage/";
import Sidebar from './Components/Navbar';
 import Invoice from './Components/Invoice';
 import InvoiceDetailPage from './Components/InvoiceDetailPage';
 import InvoiceEditPage from './Components/InvoiceEditPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/invoices" element={<Invoice />} />
           <Route path="/invoiceDetailPage" element={<InvoiceDetailPage/>}/>
           <Route path="/invoiceEditPage/:id" element={<InvoiceEditPage/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
