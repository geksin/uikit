import React from 'react';

export const PortalContext = React.createContext<React.RefObject<HTMLElement>>({current: null});

PortalContext.displayName = 'PortalContext';

export type PortalProviderProps = React.PropsWithChildren<{
    container: React.RefObject<HTMLElement>;
}>;

export const PortalProvider: React.FC<PortalProviderProps> = ({container, children}) => {
    return <PortalContext.Provider value={container}>{children}</PortalContext.Provider>;
};
