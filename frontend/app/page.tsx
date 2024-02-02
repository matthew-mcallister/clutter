'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { ClientApi } from '@/lib/client-api'

export default function Home() {
  const api = new ClientApi()
  const { data: items } = api.useItems()
  return (
    <main className={styles.main}>
      {items !== undefined ? (
        items.map((url, i) => (
          <Image key={i} src={url} width={200} height={200} alt={url} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}
