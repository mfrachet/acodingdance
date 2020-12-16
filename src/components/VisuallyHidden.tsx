import React from 'react';

export const visuallyHiddenStyle = {
    position: 'absolute',
    height: '1px',
    width: '1px',
    overflow: 'hidden',
    clip: 'rect(1px, 1px, 1px, 1px)',
    whiteSpace: 'nowrap' /* added line */,
} as any;

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const VisuallyHidden = ({ children, ...props }: VisuallyHiddenProps): JSX.Element => (
    <div css={visuallyHiddenStyle} {...props}>
        {children}
    </div>
);
