'use client'
import Desktop from '../components/Desktop'

export default function Home() {
  return (
    <>
      <style jsx global>{`
        body {
          background-color: #4a4a4a;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: "Chicago", "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
      `}</style>
      <Desktop />
    </>
  )
}

