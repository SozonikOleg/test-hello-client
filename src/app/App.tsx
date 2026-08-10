import { HashRouter } from 'react-router-dom'
import { DemoApp } from '@/app/routes/DemoApp'

// HashRouter: works on static hosts (GitHub Pages) without server rewrite rules.
function App() {
  return (
    <HashRouter>
      <DemoApp />
    </HashRouter>
  )
}

export default App
