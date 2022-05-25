import React from "react";
import { useSelector } from "react-redux";
import AppProject from "../../Components/Projects/Index";

const Home = () => {
  const { allProjects } = useSelector((s) => s.project);
  return <AppProject projectType={allProjects} />;
};

export default Home;
