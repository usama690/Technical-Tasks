import React from "react";
import { useSelector } from "react-redux";
import AppProject from "../../Components/Projects/Index";

const Home = () => {
  const { archiveProjects } = useSelector((s) => s.project);
  return <AppProject projectType={archiveProjects} />;
};

export default Home;
