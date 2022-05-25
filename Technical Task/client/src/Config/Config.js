import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, useRoutes, Navigate } from "react-router-dom";
import Home from '../Pages/AllProjects/Index'
import PendingProjects from '../Pages/PendingProjects/Index'
import CompleteProjects from '../Pages/CompleteProjects/Index'
import ArchivedProjects from '../Pages/ArchivedProjects/Index'
import Signin from '../Pages/Signin/Index'
import Signup from '../Pages/Signup/Index'
import NotFound from "../Pages/NotFound/Index";
import PageLayout from '../Components/PageLayout/Index'
import NewProject from '../Pages/NewProject/Index'
const AppRouting = () => {
    const { token } = useSelector(s => s.user)
    return (
        <Router>
            <Routes>
                <Route exact path="/signin" element={!token ? <Signin /> : <Navigate to="/" />} />
                <Route exact path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />
                <Route path="*" element={token ? <HomeRoutes /> : <Navigate to="/signin" />} />
            </Routes>
        </Router>
    );
};

const HomeRoutes = () => {
    return (
        <PageLayout>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/pending-projects" element={<PendingProjects />} />
                <Route exact path="/complete-projects" element={<CompleteProjects />} />
                <Route exact path="/archive-projects" element={<ArchivedProjects />} />
                <Route exact path="/project" element={<NewProject />} />
                <Route exact path="*" element={<NotFound />} />
            </Routes>
        </PageLayout>
    )
}


export default AppRouting;
