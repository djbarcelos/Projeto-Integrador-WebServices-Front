import React from "react";
import { Menu, ItemsMenu, Item, DropdownMenu, ItemDropdown, DividerMenu } from './styled';
import { Link } from "react-router-dom";

import './index.css'

export default function menu(props) {

    const { options } = props;

    options.map(e => {
        e.key = random();

        if (e.children)
            e.children.map(e => { e.key = random(); return e });

        return e
    });

    function random() {
        return Math.random() * (10000 - 1) + 1;
    }

    return (
        <Menu>
            <ItemsMenu>
                {options.map(e => {

                    if (e.children && e.children.length >= 0) {
                        return <Item key={e.key.toString()} >
                            <Link to={e.to}>
                                {e.icon ? e.icon : ''}
                                {e.name}
                            </Link>
                            <DropdownMenu textAling="center">
                                {
                                    e.children.map(i => {
                                        return <>
                                            <DividerMenu />
                                            {i.onClick ?
                                                <ItemDropdown key={i.key.toString()} ><a onClick={i.onClick}>{i.icon ? i.icon : ''}{i.name}</a></ItemDropdown>
                                                :
                                                <ItemDropdown key={i.key.toString()}><Link to={i.to} >{i.icon ? i.icon : ''}{i.name}</Link></ItemDropdown>
                                            }
                                        </>
                                    })
                                }
                            </DropdownMenu>
                        </Item>
                    }

                    return <Item key={e.key.toString()} ><Link to={e.to}>{e.icon ? e.icon : ''}{e.name}</Link></Item>
                })}
            </ItemsMenu>
        </Menu >
    )
}