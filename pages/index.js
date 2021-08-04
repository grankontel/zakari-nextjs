import Layout from "../components/Layout";
import ZakariForm from "../components/ZakariForm";

const Home = () => (
  <Layout>
    <div className="zakari">
      <ZakariForm />
    </div>

    <style jsx>{`
      .zakari {
        max-width: 24rem;
        margin: 0 auto;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    `}</style>
  </Layout>
);

export default Home;
