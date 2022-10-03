import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User, UserContext } from './types';
import { CartContextProvider, Nav } from './components';
import { Home, Auth, ProductPage, Search, Cart, Purchases } from './pages';

function App() {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        storedUser && setUser(JSON.parse(storedUser))
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser }} >
            <CartContextProvider>
                <BrowserRouter>
                    <Nav />
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path='/games'>
                            <Route path=':id/' element={<ProductPage />} />
                        </Route>
                        <Route path="/search" element={<Search />} />
                        <Route path='/auth' element={<Auth />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/purchases' element={<Purchases />} />
                    </Routes>
                </BrowserRouter>
            </CartContextProvider>
        </UserContext.Provider>
    );
}

export default App;
