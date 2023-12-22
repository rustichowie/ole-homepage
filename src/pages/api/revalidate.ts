import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse){

  if(req.method !== 'POST'){
    return res.status(405);
  }
  if (req.headers["api-key"] !== process.env.SANITY_INVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }
 
  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate('/')
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err, "ERROR")
    return res.status(500).send('Error revalidating')
  }
}