import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavItems, Item, DividerVertical } from './styled'

export default function nav() {

    return (
        <>
            <Nav>
                <NavItems>
                    <Item>
                        <Link to="/">
                            Início
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/meus-atendimentos">
                            Meus Atendimentos
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/ajuda">
                            Ajuda
                        </Link>
                    </Item>
                </NavItems>
            </Nav>
            <DividerVertical></DividerVertical>
        </>
    )
}