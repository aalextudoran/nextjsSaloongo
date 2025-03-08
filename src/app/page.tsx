import Image from "next/image";
import Header from "./components/header/header";  
import SalonsFrequent from "./components/salonsFrequent/salonsFrequent";

export default function Home() {

    return (
      <div>
      <Header />
      <SalonsFrequent />
      {/* Add the rest of your home page content here */}
      {/* <main>
        <h2>Welcome to Saloongo!</h2>
        <p>Discover the best beauty services in your city.</p>
      </main> */}
    </div>
    );

}
