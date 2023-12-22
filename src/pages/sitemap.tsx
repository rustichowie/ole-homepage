import { GetServerSideProps } from 'next'
import { SharedPageProps } from './_app'
import { LandingPage, getFrontPage } from '~/lib/sanity.queries'
import { getClient } from '~/lib/sanity.client'
import { readToken } from '~/lib/sanity.api'

//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts'

function generateSiteMap(lastMod) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://www.finvåg.no</loc>
       <lastmod>${lastMod}</lastmod>
     </url>
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const client = getClient(undefined)
  const frontPage = await getFrontPage(client)
  const sitemap = generateSiteMap(frontPage._updatedAt)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()
  return {
    props: {},
  }
}

export default SiteMap
