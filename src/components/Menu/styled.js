import styled from "styled-components";

export const Menu = styled.nav`

`;
export const ItemsMenu = styled.ul`
    list-style-type: none;
    padding: 0px;

    margin: 0;
    font-weight: bold; 

    text-align: center;

`;
export const Item = styled.li`
    display: inline;
    position: relative;

    font-size: 18px;

    width: 180px;

    float: right;
    height: 100%;
    padding: 10px;
    transition: background-color .1s;
    
    a {
        color: var(--bg-color-secundary);
        text-decoration: none;
        display: inline-block;
        padding: 10px;
        transition: color .5s;
        
        
        &:hover {
            color: var(--bg-color-primary);
        }
    }
    
    &:hover {
        background-color: var(--bg-color-tertiary);
        ul {
            
            display: block;
        }
    }
`;

export const DropdownMenu = styled.ul`
    display: none;
    position: absolute; 
    right: 0;
    background-color: var(--bg-color-tertiary);
    top: 50px;
    box-shadow:0 3px 5px 0 var(--bg-color-shadow);

    min-width: 180px;
    z-index: 1;
    text-decoration: none;
    padding: 0;
    text-align: ${props => props.textAling || 'left'};
`;

export const ItemDropdown = styled.li`
    list-style:none;
    font-size: 18px;
`;

export const DividerMenu = styled.hr`
    border: 0;
    height: 2px;
    background-image: linear-gradient(to right, transparent, #CCC, transparent);  
`;