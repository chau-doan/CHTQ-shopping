import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import SideBar from "./components/App/SideBar";
import Header from "./components/App/Header";
import ScreenContainer from "./components/App/ScreenContainer";
import Footer from "./components/App/Footer";

export default function App() {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <Header openSideBar={open => setSidebarIsOpen(open)} />
                </header>
                <SideBar
                    open={sidebarIsOpen}
                    closeSideBar={close => setSidebarIsOpen(close)}
                />
                <main>
                    <ScreenContainer />
                </main>
                <footer className="row center">
                    <Footer />
                </footer>
            </div>
        </BrowserRouter>
    );
}