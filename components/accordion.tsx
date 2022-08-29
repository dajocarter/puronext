import { createContext, ReactNode, useContext, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse'
import styled from 'styled-components'

const AccordionContext = createContext({
  openItem: 0,
  handleOpening: (index: number) => {}
})

export default function Accordion({ children }: { children: ReactNode }) {
  const [openItem, setOpenItem] = useState(0)

  const handleOpening = (index: number) => setOpenItem(index)

  return (
    <AccordionContext.Provider
      value={{
        openItem,
        handleOpening
      }}
    >
      <Wrapper>{children}</Wrapper>
    </AccordionContext.Provider>
  )
}

const Wrapper = styled.div`
  border: 1px solid black;
`

export function AccordionTitle({
  accordionIndex = 0,
  children
}: {
  accordionIndex: number
  children: ReactNode
}) {
  const { openItem, handleOpening } = useContext(AccordionContext)

  return (
    <Title
      role='button'
      onClick={() => handleOpening(accordionIndex)}
      aria-expanded={openItem === accordionIndex}
      aria-controls={`accordion--content-${accordionIndex}`}
    >
      {children}
    </Title>
  )
}

const Title = styled.h5`
  background-color: ${(props) => (props['aria-expanded'] ? `black` : `white`)};
  color: ${(props) => (props['aria-expanded'] ? `white` : `black`)};
  cursor: pointer;
  text-transform: uppercase;
  margin: 0;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: ${(props) =>
      props['aria-expanded'] ? `black` : `#f2f2f2`};
  }
`

export function AccordionContent({
  accordionIndex = 0,
  children
}: {
  accordionIndex: number
  children: ReactNode
}) {
  const { openItem } = useContext(AccordionContext)

  return (
    <Content in={openItem === accordionIndex}>
      <div
        id={`accordion--content-${accordionIndex}`}
        className='accordion-content'
      >
        {children}
      </div>
    </Content>
  )
}

const Content = styled(Collapse)`
  border-bottom: ${(props) => (props.in ? `1px solid black` : 0)};
  padding: 0.5rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;

  > div {
    padding: 0.5rem;
    width: 100%;
  }

  span {
    &:first-of-type {
      color: ${({ theme }) => theme.primary};
      text-transform: uppercase;
    }

    + br + span,
    + span {
      color: ${({ theme }) => theme.body};
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      color: ${({ theme }) => theme.secondary};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  li {
    a {
      margin-left: 5px;
    }
  }
`