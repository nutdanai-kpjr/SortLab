import FooterBar from "./footer_bar";
import NavBar from "./nav_bar";


export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
<>
<NavBar />
<main>{children}</main>
<FooterBar />
</>
    );
  }