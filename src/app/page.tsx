import Image from "next/image";
import Header from "./components/header/header";  
import SalonsFrequent from "./components/salonsFrequent/salonsFrequent";
import GoToBussiness from "./components/gotobusiness/gotobussiness";
import Footer from "./components/footer/footer";

export default function Home() {

    return (
      <div>
      <Header />
      <SalonsFrequent />
      <GoToBussiness />
      <Footer />
      {/* Add the rest of your home page content here */}
      {/* <main>
        <h2>Welcome to Saloongo!</h2>
        <p>Discover the best beauty services in your city.</p>
      </main> */}
    </div>
    );

}
