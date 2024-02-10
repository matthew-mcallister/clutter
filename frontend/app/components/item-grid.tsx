import React, { useEffect, useRef } from 'react'
import styles from './item-grid.module.scss'

interface Item {
  sourceUrl: string
}

interface ItemProps {
  item: Item
  onClick?: (item: Item) => Promise<void>
}

function Item(props: ItemProps) {
  const item = props.item
  const propOnClick = props.onClick
  const onClick = propOnClick ? () => propOnClick(item) : undefined
  return (
    <img
      className={styles.item}
      src={item.sourceUrl}
      alt={item.sourceUrl}
      onClick={onClick}
    />
  )
}

interface ItemDialogProps {
  item: Item
  show: boolean
  modal?: boolean
  children?: React.ReactNode
}

function ItemDialog(props: ItemDialogProps) {
  const modal = props.modal !== undefined ? props.modal : false
  const element = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!element.current) return
    const dialog = element.current
    if (props.show) {
      if (modal) {
        dialog.showModal()
      } else {
        dialog.show()
      }
    } else {
      dialog.close()
    }
  }, [props.item, props.show])
  return <dialog ref={element}>{props.children}</dialog>
}

export interface ItemGridProps {
  items?: Item[]
  onClick?: (item: Item) => Promise<void>
}

export function ItemGrid(props: ItemGridProps) {
  return (
    <>
      <div className={styles['image-view-container']}>
        {props.items !== undefined ? (
          props.items.map((item, i) => (
            <Item key={i} item={item} onClick={props.onClick} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default ItemGrid
