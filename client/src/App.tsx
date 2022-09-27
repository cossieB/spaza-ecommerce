import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { User, UserContext } from './types';
import {Nav} from './components';
import { Home, Auth, ProductPage, Search } from './pages';

function App() {
    const [user, setUser] = useState<User | null>(null)
    return (
        <UserContext.Provider value={{user, setUser}} >
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/games'>
                        <Route path=':id/' element={<ProductPage />} />
                    </Route>
                    <Route path="/search" element={<Search />} />
                    <Route path='/auth' element={<Auth />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
