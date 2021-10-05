import styled from "styled-components";

export const PageContainer = styled.div`
    padding: 25px 17%;
`;

export const Card = styled.div`
    display: table-column;
    align-items: center;
    width: ${props => props.width || '350px'};
    height: ${props => props.height || '600px'};
    background-color: ${props => props[`background-color`]};
    box-shadow: ${props => props[`box-shadow`] || '0 2px 15px 0  var(--bg-color-shadow)'};
    border-radius: ${props => props[`border-radius`] || '10px'};
    padding: ${props => props.padding || '20px'};
    margin-top: ${props => props[`margin-top`] || '25px'};
    margin: ${props => props.margin || 'auto'};
    transition: box-shadow .10s;
    &:hover{
        box-shadow: ${props => props[`box-shadow`] || '0 5px 15px 5px var(--bg-color-shadow)'};
        ${props => props}
    };
    a {
        text-decoration: none;
        font-size: 14px;
        font-weight: bold;
        color: var(--bg-color-primary);
        width: 100%;
    }
    ${props => props}
`;

export const TituloCard = styled.h1`
    color: var(--bg-color-primary);
    max-height: 50px;
    margin: 0;
    padding: 10px;
    ${props => props}
`;

export const SubTituloCard = styled.p`
color: var(--bg-color-secondary);
    max-height: 20px;
    height: 100%;
    margin: 0;
    ${props => props}
`;

export const ImgCard = styled.img`
    margin: 60px 0;
    ${props => props}
`;

export const FooterCard = styled.div`
    a {
        text-decoration: none;
        font-size: 14px;
        font-weight: bold;
        color: var(--bg-color-primary);
        width: 100%;
    }
`;

export const ButtonCard = styled.button`
    color: var(--bg-color-primary);
    background: none;
    border: none;
    width: 100%;
    height: 30px;
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
    transition: color .10s;

    &:hover {
        color: var(--bg-color-shadow);
        text-decoration: underline;
    }
`;