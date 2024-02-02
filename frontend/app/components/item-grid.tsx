import Image from 'next/image'
import styles from './item-grid.module.scss'

interface Item {
  sourceUrl: string
}

interface ImageGridProps {
  items?: Item[]
}

export function ImageGrid(props: ImageGridProps) {
  return (
    <div className={styles['image-view-container']}>
      {props.items !== undefined ? (
        props.items.map((item, i) => (
          <img key={i} src={item.sourceUrl} alt={item.sourceUrl} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ImageGrid
