import React from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'

import './index.scss'

function App() {
  return (
      <Layout>
        <Quiz />
      </Layout>
  );
}

export default App;
