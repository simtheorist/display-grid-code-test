import styled from 'styled-components';

const GridContainerDiv = styled.div`
    padding:3px;
    background:#f4f6f8;
    border-radius:5px;
    margin:0px auto;
    line-height:normal;
    min-width: 360px;
    text-align: left;
`;

const GridDiv = styled.div`
    text-align: center;
    display: grid;    
    border-width: 0px;    
`;

const GridHeaderDiv = styled.div`
    border: 3px solid;
    font-weight: bold;
    background-color: #f4f6f8;
    border-width: 0px;
    border-color: white;
    text-align: left;
    color: DimGrey;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
`;

const GridRowDiv = styled.div`
    border: 2px solid;
    font-weight: normal;
    background-color: White;
    border-width: 1px;
    border-color: #f4f6f8;
    text-align: left;
    color: DimGrey;
`;

const SearchBox = styled.input`
    margin: 1px;
    border: 0px solid LightGrey;
    outline: none;
    color: DimGrey;
    text-align: left;
    width: 98%;
    ::placeholder {
        color: LightGrey;
    }
`;

const EditBox = styled.input`
    margin: 0px;
    width: 100%;
    border-width: 0px;
    outline: none;
    color: DimGrey;    
`;

export {GridContainerDiv, GridHeaderDiv, GridDiv, GridRowDiv, SearchBox, EditBox};
