import React from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, rgba(132,133,240,1) 0%, rgba(254,168,215,1) 100%);
  width: 100%;
  min-height: 100vh;
  padding: 60px 40px;
  position: relative;
`
 
function App() {
  return (
    <AppWrapper>
      <h1>settings default</h1>
    </AppWrapper>
  );
}

export default App;
