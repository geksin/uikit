import React from 'react';
import {Menu} from '../Menu';
import {DropdownMenuContext} from './DropdownMenuContext';
import type {DropdownMenuItem as DropdownMenuItemType} from './types';

type Props<T> = Omit<DropdownMenuItemType<T>, 'text'> & {
    text?: DropdownMenuItemType<T>['text'];
    children?: React.ReactNode;
};

export const DropdownMenuItem = <T,>({text, children, action, ...props}: Props<T>) => {
    const {toggle, data} = React.useContext(DropdownMenuContext);
    const onClick: React.MouseEventHandler<HTMLElement> = React.useCallback(
        (event) => {
            action?.(event, data as unknown as T);
            toggle(false);
        },
        [action, data, toggle],
    );

    return (
        <Menu.Item onClick={onClick} {...props}>
            {text || children}
        </Menu.Item>
    );
};

DropdownMenuItem.displayName = 'DropdownMenu.Item';
