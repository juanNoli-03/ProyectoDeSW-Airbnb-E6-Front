import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer"
import {useLocation } from "react-router-dom";

export default function Page({ children }) {

  const location = useLocation ();

  const ocultarHeader = ["/signUp", "/login"].includes(location.pathname);
  console.log(location.pathname)

  return (
    <div >
      {!ocultarHeader && <Header />}
      <main style={{ minHeight: "80.9vh", background:"white"}}>{children}</main>
      {!ocultarHeader && <Footer />}
    </div>
  );
}

Page.propTypes = {
    children: PropTypes.node.isRequired,  
};
