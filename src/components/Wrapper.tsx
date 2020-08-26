import React from "react";

export const Wrapper: React.FC = ({ children }) => (
  <div
    css={(theme) => ({
      marginTop: theme.spaces[4],
      marginLeft: theme.spaces[4],
      marginRight: theme.spaces[4],
      [theme.mq.desktop]: {
        marginTop: theme.spaces[8],
        width: "720px",
        marginLeft: theme.spaces[8],
      },
    })}
  >
    {children}
  </div>
);
