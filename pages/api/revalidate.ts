import { NextApiRequest, NextApiResponse } from 'next'

// Handles requests to /revalidate?secret=<token>&slug=<slug>
// When a post is created or edited in WP, this is used to revalidate that page on-demand
export default async function revalidationHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.WORDPRESS_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const {
      post: { post_name: slug }
    } = req.body
    await res.revalidate(`/${slug}`)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
