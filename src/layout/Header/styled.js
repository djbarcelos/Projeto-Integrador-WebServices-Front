import styled from 'styled-components';

export const Header = styled.div`
    background-color: white;
    height: 80px;
    box-shadow: 0px 7px 7px -6px var(--bg-color-shadow);
    color: var(--bg-color-secondary);
`;

export const HeaderContainer = styled.div`
    padding: 5px 15%;
    display: flex;
    align-items: center;
`;
export const HeaderLogo = styled.div`
    flex: 1;
`;
export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
`;
export const ImgLogo = styled.img`
    width: 50px;
`;
export const Title = styled.p`
    font-size: ${props => props.size || '14px'};
    font-weight: ${props => props.bold || 100};
    color:  var(--bg-color-primary);
    margin: auto 15px;
    
`;