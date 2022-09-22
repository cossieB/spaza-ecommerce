import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Nav from './components/Nav';
import Product from './pages/product[id]';
import Search from './pages/search';


function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route index element={<Home />} />
                <Route path='/games'>
                    <Route path=':id/' element={<Product />} />
                </Route>
                <Route path="/search" element={<Search />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
