import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {
    Header,
    Fish,
    SeaCreatures,
    Insects,
    Footer
} from "./components/index.js";
import "./style.css"

const App = () => {
    return <>
        <div className="outsideContainer">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Header />}>
                        <Route index element={<Insects />} />
                        <Route path="fish" element={<Fish />} />
                        <Route path="sea" element={<SeaCreatures />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
        <Footer />
    </>
}

const app = document.querySelector("#app");
const root = createRoot(app);
root.render(<App />);