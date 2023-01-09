import React from 'react';
import {PortalContext} from './PortalProvider';

export function usePortalContainer(): HTMLElement {
    const context = React.useContext(PortalContext);
    return context.current ?? document.body;
}
