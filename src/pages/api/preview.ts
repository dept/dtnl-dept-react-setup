import { verifyIdToken } from '@lib/firebase/firebaseAdmin'
import { NextApiRequest, NextApiResponse } from 'next'
import { Cookies } from 'react-cookie'

function getPreviewPostBySlug(slug: string) {
  return {
    title: 'Test',
    slug: '',
  }
}

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  // if (req.query.secret !== process.env.NEXT_EXAMPLE_CMS_SANITY_PREVIEW_SECRET || !req.query.slug) {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

  try {
    const cookies = new Cookies(req.cookies)
    const token = cookies.get('idToken')

    const decoded = await verifyIdToken(token)

    console.log(decoded)

    // Fetch the headless CMS to check if the provided `slug` exists
    const post = await getPreviewPostBySlug(req.query.slug as string)

    // If the slug doesn't exist prevent preview mode from being enabled
    if (!post) {
      return res.status(401).json({ message: 'Invalid slug' })
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({})

    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.writeHead(307, { Location: `/${post.slug}` })
    res.end()
  } catch {
    res.status(500).end()
  }
}
