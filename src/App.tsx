import React, { useState } from 'react'
import styles from './App.module.scss'

interface Bubble {
  clientX: number
  clientY: number
}

function App() {
  const [list, setList] = useState<Bubble[]>([])
  const [undid, setUndid] = useState<Bubble[]>([])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const newBubble = {
      clientX: event.clientX,
      clientY: event.clientY,
    }
    setList((prev) => [...prev, newBubble])
  }

  const handleUndo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (list.length === 0) {
      return
    }

    const lastItem = list[list.length - 1]
    setUndid((prev) => [...prev, lastItem])

    setList((prev) => {
      const newArray = [...prev].slice(0, -1)
      return newArray
    })
  }

  const handleRedo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (undid.length === 0) {
      return
    }

    const recoveredBubble = undid[undid.length - 1]

    setUndid((prev) => {
      const newArray = [...prev].slice(0, -1)
      return newArray
    })
    setList((prev) => [...prev, recoveredBubble])
  }

  return (
    <div id={styles.page} onClick={handleClick}>
      <button className={styles.btn__undo} onClick={handleUndo}>
        Desfazer
      </button>
      <button className={styles.btn__redo} onClick={handleRedo}>
        Refazer
      </button>
      {list.map((item, index) => (
        <span
          key={index}
          className={styles.bubble}
          style={{ left: item.clientX - 20, top: item.clientY - 20 }}
        />
      ))}
    </div>
  )
}

export default App
