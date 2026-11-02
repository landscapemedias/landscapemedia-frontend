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
import Offer from './components/Offer'
import OurWork from './components/OurWork'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import BottomBar from './components/BottomBar'
import Nursery from './components/Nursery'
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
import AdminInquiries from './components/AdminInquiries'
import { useReveal } from './hooks'

const checkIsAdmin = () => {
  if (typeof window === 'undefined') return false
  const path = window.location.pathname.toLowerCase()
  const hash = window.location.hash.toLowerCase()
  return (
    path === '/admin' ||
    path === '/admin/' ||
    path.startsWith('/admin') ||
    hash === '#admin' ||
    hash === '#/admin' ||
    hash.startsWith('#admin')
  )
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(checkIsAdmin)
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])

  useEffect(() => {
    const onLocationChange = () => {
      setIsAdmin(checkIsAdmin())
    }
    window.addEventListener('popstate', onLocationChange)
    window.addEventListener('hashchange', onLocationChange)
    return () => {
      window.removeEventListener('popstate', onLocationChange)
      window.removeEventListener('hashchange', onLocationChange)
    }
  }, [])

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.remove('is-loading')
    } else {
      document.body.classList.toggle('is-loading', loading)
    }
  }, [loading, isAdmin])

  useReveal(!loading && !isAdmin)

  if (isAdmin) {
    return (
      <AdminInquiries
        onBack={() => {
          if (window.location.hash.toLowerCase().includes('admin')) {
            window.location.hash = ''
          } else {
            window.history.pushState(null, '', '/')
          }
          setIsAdmin(false)
        }}
      />
    )
  }

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
        <Offer />
        <OurWork />
        <Portfolio />
        <Mockups />
        <NicheStories />
        <Projects />
        <Testimonials />
        <Viewfinder />
        <FlyerDrop />
        <Seasons />
        <GoldenHour />
        <AppShowcase />
        <WhyUs />
        <Process />
        <Booking />
        <Faq />
      </main>
      <Footer />
      <BottomBar />
    </>
  )
}
