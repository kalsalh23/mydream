import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/sections/Hero'
import Idea from '../components/sections/Idea'
import Team from '../components/sections/Team'
import Supervisors from '../components/sections/Supervisors'
import Problem from '../components/sections/Problem'
import Importance from '../components/sections/Importance'
import Goals from '../components/sections/Goals'
import Components from '../components/sections/Components'
import WorkingMechanism from '../components/sections/WorkingMechanism'
import BlockDiagram from '../components/sections/BlockDiagram'
import Features from '../components/sections/Features'
import HardwareSoftware from '../components/sections/HardwareSoftware'
import Stages from '../components/sections/Stages'
import Testing from '../components/sections/Testing'
import Gallery from '../components/sections/Gallery'
import Documents from '../components/sections/Documents'
import Conclusion from '../components/sections/Conclusion'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Idea />
      <Team />
      <Supervisors />
      <Problem />
      <Importance />
      <Goals />
      <Components />
      <WorkingMechanism />
      <BlockDiagram />
      <Features />
      <HardwareSoftware />
      <Stages />
      <Testing />
      <Gallery />
      <Documents />
      <Conclusion />
      <Footer />
    </>
  )
}