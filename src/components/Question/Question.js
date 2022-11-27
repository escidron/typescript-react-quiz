import styled from 'styled-components'

export const Question = styled.div`
    height: 40px;
    width: 550px;  
    font-size: 20px;
    color:white;
    background-color:${props => props.color || '#66b8cb'};
    border-radius: 10px;
    display:flex;
    justify-content:center;
    align-items: center;
`;

export const WrapQuestion = styled.div`
padding:4px;
border-radius: 10px;
box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
margin-top:5px;
cursor:pointer;
pointer-events: ${props => props.action || ''};
`
// #66b8cb