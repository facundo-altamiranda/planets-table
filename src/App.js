import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { getPlanets } from './api';
import { Header, PlanetsTable } from './components'; 
import './App.scss';

const {Column: GridColumn} = Grid;

const App = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanetsAsync = async () => {
      const {data: {results}} = await getPlanets();

      setPlanets(results);
    };

    getPlanetsAsync();
  }, []);

  return (
    <div>
      <Header />
      <Grid centered>
        <GridColumn className={'fourteen wide grid-table'}>
          <PlanetsTable planets={planets}/>
        </GridColumn>
      </Grid>
    </div>
  );
}

export default App;
