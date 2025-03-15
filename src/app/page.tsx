import Image from "next/image";
import Header from "./components/header/header";  
import SalonsFrequent from "./components/salonsFrequent/salonsFrequent";
import Footer from "./components/footer/footer";
import SalonsNew from "./components/salonsNew/salonsNew";
import SalonRegister from "./components/salonRegister/salonRegister";

export default function Home() {

    return (
      <div>
      <Header />
      <SalonsFrequent />
      <SalonsNew/>
      <SalonRegister/>
      <Footer />
    </div>
    );

}
