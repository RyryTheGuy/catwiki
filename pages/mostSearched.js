import Error from "next/error";
import Layout from "../components/Layout/layout";
import { getAllBreeds } from "../lib/catAPI";

export async function getServerSideProps() {
  const response = await getAllBreeds();
  const cats = await response.json();

  if (response.status !== 200) 
    return { props: { statusCode: response.status }};

  return { props: { cats, statusCode: 200 }};
  
}

export function MostSearched({ cats, statusCode }) {
  if (statusCode !== 200) return <Error statusCode={statusCode} />;

  return (
    <Layout>
      <h2>Top 10 most searched breeds</h2>
    </Layout>
  );
}