import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/sections/Hero'
import Idea from '../components/sections/Idea'
import Team from '../components/sections/Team'
import Supervisors from '../components/sections/Supervisors'
import Conclusion from '../components/sections/Conclusion'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Idea />
      <Team />
      <Supervisors />
      <Conclusion />
      <Footer />
    </>
  )
}
