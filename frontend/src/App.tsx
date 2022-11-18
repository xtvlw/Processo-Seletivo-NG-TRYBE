import React, { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Sign from "./components/loginPage/Sign"
import Table from "./components/table/Table"
import Transfer from './components/transfer/Transfer'
// css
import "./app.css"

const App: FC = () => {
  const isValid: boolean = true

  return (
    <div className='center'>
      {!isValid ? <Sign /> : <div>
        <Transfer />
        <Table />
        </div>}
    </div>
  );
}

export default App;
