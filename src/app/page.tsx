import Hero from '@/components/sections/hero';
import Problem from '@/components/sections/problem';
import Solution from '@/components/sections/solution';
import Methodology from '@/components/sections/methodology';
import OtherServices from '@/components/sections/other-services';
import Tracking from '@/components/sections/tracking';
import Gallery from '@/components/sections/gallery';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <div id="metodo">
        <Methodology />
      </div>
      <div id="servicios">
        <OtherServices />
      </div>
      <Tracking />
      <div id="proyectos">
        <Gallery />
      </div>
      <div id="contacto">
        <Contact />
      </div>
    </>
  );
}
