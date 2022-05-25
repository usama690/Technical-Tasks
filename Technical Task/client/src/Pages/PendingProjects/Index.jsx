import React from "react";
import { useSelector } from "react-redux";
import AppProject from "../../Components/Projects/Index";

const Home = () => {
  const { pendingProjects } = useSelector((s) => s.project);
  return <AppProject projectType={pendingProjects} />;
};

export default Home;
