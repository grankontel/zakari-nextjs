import Layout from "../components/Layout";
import ZakariForm from "../components/ZakariForm";
import { useSession } from "next-auth/client";

const Home = () => {
  const [session] = useSession();

  return (
    <Layout>
      <div className="zakari">
        <ZakariForm
          endPoint={process.env.NEXT_PUBLIC_ZAKARI_ENDPOINT}
          zakariToken={session?.user?.zakariToken || false }
        />
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
};

export default Home;
