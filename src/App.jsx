import { useCallback, useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Manifesto from './components/Manifesto'
import Seasons from './components/Seasons'
import NicheStories from './components/NicheStories'
import WhyUs from './components/WhyUs'
import Projects from './components/Projects'
import AppShowcase from './components/AppShowcase'
import Estimate from './components/Estimate'
import BottomBar from './components/BottomBar'
import Nursery from './components/Nursery'
import PlantPassport from './components/PlantPassport'
import Process from './components/Process'
import Booking from './components/Booking'
import Faq from './components/Faq'
import BrandReveal from './components/BrandReveal'
import Mockups from './components/Mockups'
import Footer from './components/Footer'
import GrowthRoots from './components/GrowthRoots'
import Viewfinder from './components/Viewfinder'
import GoldenHour from './components/GoldenHour'
import TruckWrap from './components/TruckWrap'
import FlyerDrop from './components/FlyerDrop'
import { useReveal } from './hooks'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])

  useEffect(() => {
    document.body.classList.toggle('is-loading', loading)
  }, [loading])

  useReveal(!loading)

  return (
    <>
      {loading && <Preloader onDone={done} />}
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <BrandReveal />
        <Manifesto />
        <GrowthRoots />
        <TruckWrap />
        <Nursery />
        <PlantPassport />
        <Mockups />
        <NicheStories />
        <Projects />
        <Viewfinder />
        <FlyerDrop />
        <Seasons />
        <GoldenHour />
        <AppShowcase />
        <WhyUs />
        <Estimate />
        <Process />
        <Booking />
        <Faq />
      </main>
      <Footer />
      <BottomBar />
    </>
  )
}
