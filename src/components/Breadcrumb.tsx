/**
 * Following: https://www.w3.org/TR/wai-aria-practices/#breadcrumb
 */
import React, { useRef, useEffect } from "react";

export interface BreadCrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({
  children,
  label,
  ...props
}) => {
  const breadCrumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anchors = breadCrumbRef?.current?.querySelectorAll(`a`) || [];

    anchors[anchors.length - 1]?.setAttribute("aria-current", "page");
  }, []);

  return (
    <div
      aria-label={label}
      role="navigation"
      ref={breadCrumbRef}
      {...props}
      css={(theme) => ({ marginBottom: theme.spaces[6] })}
    >
      {children}
    </div>
  );
};

export interface BreadCrumbListItemProps
  extends React.HTMLAttributes<HTMLOListElement> {}

const breadCrumbListCss = (theme) =>
  ({
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",

    [theme.mq.desktop]: {
      flexDirection: "row",
    },
  } as any);

export const BreadCrumbList: React.FC<BreadCrumbListItemProps> = ({
  children,
  ...props
}) => {
  return (
    <ol {...props} css={breadCrumbListCss}>
      {children}
    </ol>
  );
};

export interface BreadCrumbItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  emphasized?: boolean;
}

export const BreadCrumbItem: React.FC<BreadCrumbItemProps> = ({
  children,
  emphasized,
  ...props
}) => {
  return (
    <li
      {...props}
      css={(theme) => ({
        marginBottom: 0,

        "&:before": {
          content: '""',
          background: theme.colors.background2,
          border: `1px solid ${theme.colors.primary}`,
          borderRadius: "50%",
        },

        '[aria-current="page"]': {
          color: emphasized ? theme.colors.primary : theme.colors.text,
          textDecoration: "none",
        },

        "&:last-of-type:before": {
          content: '""',
          background: theme.colors.primary,
          borderRadius: "50%",
        },

        [theme.mq.desktop]: {
          "&:before": { content: "none" },
          "&:last-of-type:before": {
            content: "none",
          },
        },
      })}
    >
      {children}
    </li>
  );
};

export const BreadCrumbItemSeparator: React.FC<BreadCrumbItemProps> = ({
  children,
  ...props
}) => {
  return (
    <li
      {...props}
      css={(theme) => ({
        marginBottom: theme.spaces[2],
        "&:before": { content: "none" },

        span: {
          display: "none",
        },

        [theme.mq.desktop]: {
          span: {
            display: "block",
            width: theme.spaces[4],
            textAlign: "center",
          },
        },
      })}
      role="separator"
      aria-hidden={true}
    >
      <span>/</span>
    </li>
  );
};
