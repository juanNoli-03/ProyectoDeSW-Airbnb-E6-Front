import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer"

export default function Page({ children }) {

  const ocultarHeader = ["/", "/signUp"].includes(location.pathname);

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
