import React, { FC } from 'react';
import'bootstrap/dist/css/bootstrap.min.css';

// components
import Sign from "./components/loginPage/Sign"
import Table from "./components//main/Table"

// css
import "./app.css"

const App: FC = () => {
  const isValid: boolean = false

  return (
    <div className='center'>
      {!isValid ? <Sign/> : <Table />}
    </div>
  );
}

export default App;
