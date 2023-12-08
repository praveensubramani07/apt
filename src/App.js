import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Product from './components/Product';
import Category from './components/Category';
import SubCategory from './components/SubCategory';
import Home from './components/Home';
import Viewall from './components/Viewall';
import Search from './components/Search';
import About from './components/About';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/viewall' element={<Viewall/>}/>
      <Route path='/:category' element={<Category/>}/>
      <Route path='/:category/:subCategory' element={<SubCategory/>}/>
      <Route path='/product/:title' element={<Product/>}/>
      <Route path='/search/:keyword' element={<Search/>}/>
      <Route path='/about' element={<About/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
