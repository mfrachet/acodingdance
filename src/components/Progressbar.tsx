import React from 'react';

export const Progressbar: React.FC<{ width: number }> = ({ width }) => {
    return (
        <div
            aria-hidden={true}
            css={(theme) => ({
                transition: 'all .2s',
                zIndex: 9999,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateX(-${100 - width}%)`,
                height: theme.spaces[0],
                backgroundImage: `linear-gradient(90deg, ${theme.colors.secondary}, ${theme.colors.primary})`,
            })}
        ></div>
    );
};
