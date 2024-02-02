'use client'

import ItemGrid from '@/components/item-grid'
import styles from './page.module.css'
import { ClientApi } from '@/lib/client-api'

export default function Home() {
  const api = new ClientApi()
  const { data: items } = api.useItems()
  const mappedItems = items ? items.map(url => ({ sourceUrl: url })) : undefined
  return (
    <main className={styles.main}>
      <ItemGrid items={mappedItems} />
    </main>
  )
}
