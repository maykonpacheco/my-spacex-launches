import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home({ launches }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Launches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SpaceX Launches
        </h1>

        <p className={styles.description}>
          Últimos lançamentos da SpaceX
        </p>

        <div className={styles.grid}>
          {launches.map(launch => {
            return (
              <a key={launch.id} href={launch.links.video_link} className={styles.card}>
                <h3>{launch.mission_name}</h3>
                <p><strong>Data de Lançamento:</strong>{new Date(launch.launch_date_local).toLocaleString("en-US")}</p>
              </a>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.linkedin.com/in/maykonpacheco/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Maykon Pacheco</p>
        </a>
      </footer>
    </div>
  )
}


export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
    query GetLaunches {
      launchesPast(limit: 10) {
        id
        mission_name
        launch_date_local
        launch_site {
          site_name_long
        }
        links {
          article_link
          video_link
          mission_patch
        }
        rocket {
          rocket_name
        }
      }
    }
  `
  });

  return {
    props: {
      launches: data.launchesPast
    }
  }
}