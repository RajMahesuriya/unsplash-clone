import { Route, Routes } from "react-router-dom";
import Collection from "./components/collection";
import Header from "./components/header";
import Hero from "./components/hero";
import Layout from "./components/layout";
import Main from "./components/main";
import DetailsPage from "./components/detailsPage";

const App = () => {
  return (
    <Layout>
      <Header />
      <Main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Collection />
              </>
            }
          />
          <Route
            path="/s/photos/:title"
            element={
              <>
                <DetailsPage />
              </>
            }
          />
        </Routes>
      </Main>
    </Layout>
  );
};

export default App;
