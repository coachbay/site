import './index.css'
import AIDiagnostic from './Diagnostic'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      <AIDiagnostic />
      <Analytics />
    </>
  )
}
