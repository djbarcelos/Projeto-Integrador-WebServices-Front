import React from "react";
import Nav from "../Nav";
import Menu from "../../components/Menu";
import { Header, HeaderLogo, HeaderContainer, ImgLogo, Title, LogoContainer } from './styled'
import { UserOutlined } from '@ant-design/icons';

export default function header() {

    const optionsMenu = [
        {
            name: 'Username',
            icon: <UserOutlined style={{ fontSize: '16px', marginRight: '5px' }} />,
            to: '/perfil',
            children: [
                {
                    name: 'Perfil',
                    to: '/perfil',
                },
                {
                    name: 'Configuração',
                    to: '/configuracao',
                },
                {
                    name: 'Sair',
                    to: '/login',
                }
            ]
        }
    ]

    return (
        <Header>
            <HeaderContainer>
                <HeaderLogo>
                    <LogoContainer>
                        <ImgLogo src="./medicpass.png" />
                        <Title size="23px" bold='bold'>
                            MedicPass
                        </Title>
                    </LogoContainer>
                </HeaderLogo>
                <Nav></Nav>
                <Menu options={optionsMenu}></Menu>

            </HeaderContainer>
        </Header>
    )
}