import { Routes , Route } from 'react-router' ;
import HomePage from './pages/homePage' ;
import Form from './pages/FormPage' ;
import LetterPage from './pages/Lettterpage' ;

import './index.css'
function App() {
  return (
    <>
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path='form' element={<Form />}/>
      <Route path='/letter/:id' element={<LetterPage />} />
    </Routes>
    </>
  )
}

export default App
