import * as React from "react";

export const Wrapper: React.FC = ({ children }) => (
  <div
    css={(theme) => ({
      marginTop: theme.spaces[4],
      marginLeft: theme.spaces[4],
      marginRight: theme.spaces[4],
      [theme.mq.desktop]: {
       margin: `${theme.spaces[5]} auto`,
        width: "65ch",
      },
    })}
  >
    {children}
  </div>
);
