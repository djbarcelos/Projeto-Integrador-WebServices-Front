import React from "react";
import { Menu, ItemsMenu, Item, DropdownMenu, ItemDropdown, DividerMenu } from './styled';
import { Link } from "react-router-dom";

import './index.css'

export default function menu(props) {

    const { options } = props;

    function random() {
        return Math.random() * (10000 - 1) + 1;
    }

    return (
        <Menu key={random()}>
            <ItemsMenu key={random()}>
                {options.map(e => {

                    if (e.children && e.children.length >= 0) {
                        return <Item key={random()} >
                            <Link key={random()} to={e.to}>
                                {e.icon ? e.icon : ''}
                                {e.name}
                            </Link>
                            <DropdownMenu key={random()} textAling="center">
                                {
                                    e.children.map(i => {
                                        return <>
                                            <DividerMenu />
                                            <ItemDropdown key={random()} ><Link key={random()} to={i.to}>{i.icon ? i.icon : ''}{i.name}</Link></ItemDropdown>
                                        </>
                                    })
                                }
                            </DropdownMenu>
                        </Item>
                    }

                    return <Item key={random()} ><Link key={random()} to={e.to}>{e.icon ? e.icon : ''}{e.name}</Link></Item>
                })}
            </ItemsMenu>
        </Menu>
    )
}