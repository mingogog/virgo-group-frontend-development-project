import { ApplicationForm } from './components/ApplicationForm'
import formData from './data/formData.json'

function App() {
  return (
    <>
      <div className="relative max-w-md mx-auto mt-20">
        <ApplicationForm {...formData} />
      </div>
    </>
  )
}

export default App
