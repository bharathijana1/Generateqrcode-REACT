import { useState } from 'react'

import QRCode from './Components/QRCode'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QRCode />
    </>
  )
}

export default App
