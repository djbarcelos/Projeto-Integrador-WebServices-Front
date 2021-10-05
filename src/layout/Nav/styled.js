import styled from "styled-components";

export const Nav = styled.nav`
    
`;
export const NavItems = styled.ul`
    display: flex;
    margin: auto;
`;
export const Item = styled.li`
    font-size: 18px;
    list-style-type: none;
    padding: 0px;
    margin: 0px 30px;
    font-weight: bold; 
    text-align: center;
    
    a{
        text-decoration: none;
        color: var(--bg-color-secundary);
        transition: color .5s;
        &:hover{
            color: var(--bg-color-primary);
        }
    }

`;
export const DividerVertical = styled.div `
    height: 40px;
    border-right: 1px solid var(--bg-color-shadow);
`;
