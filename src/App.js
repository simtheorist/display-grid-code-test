import styled from 'styled-components';
import './App.css';
import Grid from './grid/Grid';
require('source-map-support').install();

/* 
This is the entry point for the Grid component.
All of the demo 'business logic', aka the rows and columns, are listed here. 
The Grid component itself is generic
*/

// Automobiles
const data = 
[
  { id: 1, manufacturer: 'Ford', model: 'Focus' },
  { id: 2, manufacturer: 'Ford', model: 'Mustang' },
  { id: 3, manufacturer: 'Ford', model: 'F-150' },
  { id: 4, manufacturer: 'Chevrolet', model: 'Corvette' },
  { id: 5, manufacturer: 'Chevrolet', model: 'Equinox' },
  { id: 6, manufacturer: 'Tesla', model: 'Model 3' },
  { id: 7, manufacturer: 'Toyota', model: 'Camry' },
  { id: 8, manufacturer: 'Dodge', model: 'Charger' },
  { id: 9, manufacturer: 'Dodge', model: 'Challenger' }
]

const columns = [
  {name: 'id', widthPct: 20},
  {name: 'manufacturer', searchable: true, editable: true, boldText: 'Ford', widthPct: 40},
  {name: 'model', searchable: true, editable: true, upperCase: true, widthPct: 40}
]

// const data = [
//   { id: 1, cat: 'Penny', age: '7', sex: 'F' },
//   {id: 2, cat: 'Max', age: '5', sex: 'M'},
//   {id: 3, cat: 'Squeaky', sex: 'F'},
//   {id: 4, cat: 'Explorer', age: '2', sex: 'F'}
// ];

// const columns = [
//   {name: 'cat', widthPct: 17, searchable: true, editable: true},
//   {name: 'age', widthPct: 16},
//   {name: 'sex', widthPct: 16},
//   {name: 'cat', widthPct: 17, searchable: true, editable: true},
//   {name: 'age', widthPct: 16},
//   {name: 'sex', widthPct: 16} 
// ]

// Uncomment this once if you want to try the grid with different data
//localStorage.clear();

const AppContainer = styled.div`
  text-align: center;
  display: grid;
`

function App() {
  return (
    <AppContainer>
        <h3>Automobiles</h3>
        <Grid data={data} columns={columns} />
    </AppContainer>
  );
}

export default App;
