import React, { useState, useEffect, ReactElement, Children } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link, { LinkProps } from 'next/link'

export const StyledButtonLink = styled.a<{
  primary?: boolean
  secondary?: boolean
}>`
  border-width: 3px;
  border-style: solid;
  border-color: ${(props) =>
    props.primary
      ? props.theme.primary
      : props.secondary
      ? props.theme.secondary
      : props.theme.alt};
  background-color: transparent;
  color: black;
  display: inline-block;
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 1.5;
  padding: 0.5rem 1.5rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition-property: background-color, border-color, color;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.primary
        ? props.theme.primary
        : props.secondary
        ? props.theme.secondary
        : props.theme.alt};
    color: white;
    cursor: pointer;
    text-decoration: none;
  }
`

type ActiveLinkProps = LinkProps & {
  children: ReactElement
  activeClassName: string
}
export const ActiveLink = ({
  children,
  activeClassName = 'active',
  ...props
}: ActiveLinkProps) => {
  const { asPath, isReady } = useRouter()

  const child = Children.only(children)
  const childClassName = child.props.className || ''
  const [className, setClassName] = useState(childClassName)

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic routes will be matched via props.as
      // Static routes will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname

      const newClassName =
        activePathname === linkPathname
          ? `${childClassName} ${activeClassName}`.trim()
          : childClassName

      if (newClassName !== className) {
        setClassName(newClassName)
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    activeClassName,
    childClassName,
    className
  ])

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null
      })}
    </Link>
  )
}
