import * as React from 'react';
import { GoCalendar } from 'react-icons/go';

const timeCss = (theme) => ({
    fontSize: theme.fontSizes[0],
    color: theme.colors.text,
    marginLeft: theme.spaces[0],
});

export const Time = (props) => {
    return (
        <span css={{ display: 'inline-flex' }}>
            <GoCalendar aria-hidden={true} />
            <time css={timeCss} {...props} />
        </span>
    );
};
