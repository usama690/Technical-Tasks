import React from "react";
import { useSelector } from "react-redux";
import AppProject from "../../Components/Projects/Index";

const Home = () => {
  const { completeProjects } = useSelector((s) => s.project);
  return <AppProject projectType={completeProjects} />;
};

export default Home;
