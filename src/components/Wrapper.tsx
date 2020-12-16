import * as React from "react";

export const Wrapper: React.FC = ({ children }) => (
  <div
    css={(theme) => ({
      marginTop: theme.spaces[3],
      marginLeft: theme.spaces[4],
      marginRight: theme.spaces[4],
      position: 'relative',

      [theme.mq.desktop]: {
       margin: `${theme.spaces[3]} auto`,
        width: "65ch",
      },
    })}
  >
    {children}
  </div>
);
