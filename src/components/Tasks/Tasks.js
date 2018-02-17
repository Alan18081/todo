import React from 'react';

import Layout from '../../hoc/Layout/Layout';
import TaskList from '../../containers/TasksList/TasksList';

const tasks = props => (
  <Layout>
    <TaskList/>
  </Layout>
);

export default tasks;