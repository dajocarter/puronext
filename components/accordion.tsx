import { createContext, ReactNode, useContext, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse'
import styles from './accordion.module.scss'

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
      <div className={styles.wrapper}>{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionTitle({
  accordionIndex = 0,
  children
}: {
  accordionIndex: number
  children: ReactNode
}) {
  const { openItem, handleOpening } = useContext(AccordionContext)
  const isOpen = openItem === accordionIndex

  return (
    <h5
      className={
        isOpen ? `${styles.title} ${styles.titleShowing}` : styles.title
      }
      role='button'
      onClick={() => handleOpening(accordionIndex)}
      aria-expanded={isOpen}
      aria-controls={`accordion--content-${accordionIndex}`}
    >
      {children}
    </h5>
  )
}

export function AccordionContent({
  accordionIndex = 0,
  children
}: {
  accordionIndex: number
  children: ReactNode
}) {
  const { openItem } = useContext(AccordionContext)
  const isOpen = openItem === accordionIndex

  return (
    <Collapse
      in={isOpen}
      className={
        isOpen ? `${styles.content} ${styles.contentShowing}` : styles.content
      }
    >
      <div
        id={`accordion--content-${accordionIndex}`}
        className='accordion-content'
      >
        {children}
      </div>
    </Collapse>
  )
}
