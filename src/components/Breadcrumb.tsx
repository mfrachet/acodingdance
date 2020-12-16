/**
 * Following: https://www.w3.org/TR/wai-aria-practices/#breadcrumb
 */
import React, { useRef, useEffect } from "react";
import { MdKeyboardArrowRight} from 'react-icons/md'

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

        '[aria-current="page"]': {
          color: emphasized ? theme.colors.secondary : theme.colors.text,
          textDecoration: "none",
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
      role="separator"
      aria-hidden={true}
      css={theme => ({
        display: 'flex',
        alignItems: 'center',
        margin: `0 ${theme.spaces[0]}`
      })}
    >
      <MdKeyboardArrowRight />
    </li>
  );
};
