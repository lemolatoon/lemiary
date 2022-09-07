import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { SubmitPage } from "./submitPage";


export const RouterConfig: React.VFC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<App />} />
                    <Route path="submit" element={<SubmitPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}