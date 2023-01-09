import React from 'react';

import {DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME, DEFAULT_THEME} from './constants';
import {ThemeContext} from './ThemeContext';
import {ThemeValueContext} from './ThemeValueContext';
import {ThemeSettings, ThemeSettingsContext} from './ThemeSettingsContext';
import type {Theme, RealTheme} from './types';
import {updateBodyClassName} from './updateBodyClassName';
import {useSystemTheme} from './useSystemTheme';

interface ThemeProviderExternalProps {}

interface ThemeProviderDefaultProps {
    theme: Theme;
    systemLightTheme: RealTheme;
    systemDarkTheme: RealTheme;
    nativeScrollbar: boolean;
}

export interface ThemeProviderProps
    extends ThemeProviderExternalProps,
        Partial<ThemeProviderDefaultProps>,
        React.PropsWithChildren<{}> {}

export function ThemeProvider({
    theme: themeProp = DEFAULT_THEME,
    systemLightTheme: systemLightThemeProp = DEFAULT_LIGHT_THEME,
    systemDarkTheme: systemDarkThemeProp = DEFAULT_DARK_THEME,
    nativeScrollbar = false,
    children,
}: ThemeProviderProps) {
    const [theme, setTheme] = React.useState<Theme>(themeProp);
    const [{systemLightTheme, systemDarkTheme}, setThemeSettings] = React.useState<ThemeSettings>({
        systemLightTheme: systemLightThemeProp,
        systemDarkTheme: systemDarkThemeProp,
    });

    React.useLayoutEffect(() => {
        setTheme(themeProp);
        setThemeSettings({
            systemLightTheme: systemLightThemeProp,
            systemDarkTheme: systemDarkThemeProp,
        });
    }, [themeProp, systemLightThemeProp, systemDarkThemeProp]);

    const systemTheme = (
        useSystemTheme() === 'light' ? systemLightTheme : systemDarkTheme
    ) as RealTheme;
    const themeValue = theme === 'system' ? systemTheme : theme;

    React.useEffect(() => {
        updateBodyClassName(themeValue, {'native-scrollbar': nativeScrollbar});
    }, [nativeScrollbar, themeValue]);

    const contextValue = React.useMemo(
        () => ({
            theme,
            themeValue,
            setTheme,
        }),
        [theme, themeValue],
    );

    const themeValueContext = React.useMemo(() => ({themeValue}), [themeValue]);

    const themeSettingsContext = React.useMemo(
        () => ({
            themeSettings: {systemLightTheme, systemDarkTheme},
            setThemeSettings,
        }),
        [systemLightTheme, systemDarkTheme],
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeSettingsContext.Provider value={themeSettingsContext}>
                <ThemeValueContext.Provider value={themeValueContext}>
                    {children}
                </ThemeValueContext.Provider>
            </ThemeSettingsContext.Provider>
        </ThemeContext.Provider>
    );
}

ThemeProvider.displayName = 'ThemeProvider';
