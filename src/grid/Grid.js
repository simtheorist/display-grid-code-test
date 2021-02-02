import { useState, useEffect } from 'react';
import * as Styled from './Styled';

const Grid = (props) => {
    const savedData = JSON.parse(localStorage.getItem('gridData'));
    const [data, setData] = useState(savedData ? savedData : props.data);
    const [displayData, setDisplayData] = useState(data);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({sortColumn: '', ascending: false});

    // Keeps the filtered/sorted display data in sync with the source data
    useEffect(() => {
        setDisplayData(data);
    }, [data])

    // Updates the state and saves it to local storage.
    const saveData = (newData) => {
        localStorage.setItem('gridData', JSON.stringify(newData));
        setData(newData);
    }

    // Sorting change when clicking on a column header. newSort is the name of the column to sort by.
    // Because of a bug, for an unfiltered grid we sort the source data and a for a filtered grid we sort the display data.
    // UseEffect() will update the display data anyway if necessary.
    const changeSort = (newSort) => {
        let newData = [];
        if (search === '') {
            if (sort.ascending)
                newData = data.sort((a, b) => a[newSort] > b[newSort] ? 1 : -1);
            else 
                newData = data.sort((a, b) => a[newSort] > b[newSort] ? -1 : 1);
            saveData(newData);
        }
        else {
            if (sort.ascending)
                newData = displayData.sort((a, b) => a[newSort] > b[newSort] ? 1 : -1);
            else 
                newData = displayData.sort((a, b) => a[newSort] > b[newSort] ? -1 : 1);
            setDisplayData(newData);
        }
        
        setSort({sortColumn: newSort, ascending: !sort.ascending});
    }

    // The id attribute for the text input contains row id and column name. These are used to find the particular row and field to update.
    const changeValue = (e) => {
        const newValue = e.target._valueTracker.getValue();
        const idVals = e.target.id.split('|');
        const columnName = idVals[0];
        const id = parseInt(idVals[1]);
        const newData = data.map(auto => auto.id === id ? {...auto, [columnName]: newValue} : auto);
        saveData(newData); 
    }

    // Each field in a given row. If editable, a simple input with some styles applied for now
    const renderField = (row, column) => {
        if (column.hidden && column.hidden === true) return null;
        if (!column.editable) return <Styled.GridRowDiv key={row.id + column.name} >{row[column.name]}</Styled.GridRowDiv>
        else return (            
            <Styled.GridRowDiv key={row.id + column.name}>
                <Styled.EditBox
                    style={(column.boldText && column.boldText.toUpperCase() === row[column.name].toUpperCase()) ? 
                    {fontWeight: 'bold'} : {}} id={column.name  + '|' + row.id} type="text" 
                    value={row[column.name] ? (column.upperCase ? row[column.name].toUpperCase() : row[column.name]) : ''} 
                    onChange={changeValue} />
            </Styled.GridRowDiv>
        )
    }

    // Each row below the header. Field width is determined based on the percentage in the column
    const renderRow = (row) => {
        return (
            <Styled.GridDiv key={row.id} style={{gridTemplateColumns: getColumnWidthPct()}}>
                { props.columns.map(column => renderField(row, column)) }                
            </Styled.GridDiv>
        )
    }

    // Passes in the list of searchable column names to search the current row
    const searchRow = (row, newSearch, columnNames) => {
        for (let i = 0; i < columnNames.length; i++) {
            if (row[columnNames[i]].toUpperCase().includes(newSearch.toUpperCase())) return true;                        
        }
        return false;
    }

    // When the search value at the top changes, we filter the data accordingly. 
    // data is all the rows and displayData is the filtered row array
    const searchChange = (e) => {
        const newSearch = e.target._valueTracker.getValue();
        setSearch(newSearch);
        const columnNames = props.columns.filter(c => c.searchable).map(c=> { return c.name });
        if (newSearch && newSearch !== '') 
            setDisplayData(data.filter(r => searchRow(r, newSearch, columnNames) === true));
        else setDisplayData(data);
    }

    // Returns the unicode for the up or down chevron if the current column is being sorted
    const setSortIcon = (column) => {
        if (sort.sortColumn === column)  return (sort.ascending ? '\u25BC' : '\u25B2');
        else return '';
    }

    const renderHeader = (column) => {
        if (column.hidden && column.hidden === true) return null;
        return (
            <Styled.GridHeaderDiv key={column.name} onClick={() => changeSort(column.name)}>
                <div key={1}>{column.name.toUpperCase()}</div>
                <div key={2}>{setSortIcon(column.name)}</div>
            </Styled.GridHeaderDiv>
        )
    }

    // This creates the grid-template-columns percentage value for the CSS grid layout. 
    // Each column should have a value and they should add up to 100. Example: 20% 40% 40% for 3 columns
    const getColumnWidthPct = () => {
        let pct = props.columns.map(c => {return c.widthPct}).join('% ');
        pct += '%';
        return pct;
    }

    return (
        <Styled.GridContainerDiv key={1}>
            <Styled.SearchBox key={-2} type="text" value={search} onChange={searchChange} placeholder="Search" />
            <Styled.GridDiv key={-1} style={{gridTemplateColumns: getColumnWidthPct()}}>
                {props.columns.map(renderHeader)}
            </Styled.GridDiv>
            {displayData.map(renderRow)}
        </Styled.GridContainerDiv>
    )     
}

export default Grid;