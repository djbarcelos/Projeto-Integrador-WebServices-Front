import styled from 'styled-components';

export const PageContainerLogin = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: var(--bg-color-tertiary);
    /* background-size: 2100px; */
    display: inline-flex;
`;

export const CardLogin = styled.div `
    width: 600px;
    height: 500px;
    margin: auto;
    padding: 40px;
    background-color: white;
    border-radius: 10px;
    box-shadow:  0px 2px 20px 0px var(--bg-color-secondary);
`

export const TitleCardLogin = styled.div `
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: var(--bg-color-secondary);
`;
