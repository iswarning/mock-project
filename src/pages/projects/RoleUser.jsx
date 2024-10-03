import React from 'react';
import { useSelector } from 'react-redux';
import ProjectsList from './ProjectsList';

const RoleUser = () => {
  const { projects } = useSelector((state) => state.projectStore);
  return (
    <>
      <ProjectsList projects={projects} />
    </>
  );
};

export default RoleUser;
