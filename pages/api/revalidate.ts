import { NextApiRequest, NextApiResponse } from 'next'

// Handles requests to /revalidate?secret=<token>&slug=<slug>
// When a post is created or edited in WP, this is used to revalidate that page on-demand
export default async function revalidationHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    console.error('SECRET DID NOT MATCH REVALIDATION TOKEN')
    return res.status(401).json({ message: 'Invalid token' })
  }

  const {
    post: { post_name }
  } = req.body
  const path = post_name === 'home' ? '/' : `/${post_name}`
  console.info(`ATTEMPTING TO REVALIDATE: ${path}`)

  try {
    await res.revalidate(path)
    console.info(`${path} REVALIDATED`)
    return res.json({ revalidated: true })
  } catch (err) {
    console.error(`ERROR REVALIDATING ${path}`, err)
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
