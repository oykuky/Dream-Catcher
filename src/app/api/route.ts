import type { NextApiRequest, NextApiResponse } from 'next';
import { Dream } from '@/lib/models';
import { getSession } from 'next-auth/react';
import connectToDb from '@/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDb();

    // const session = await getSession({ req });
    // if (!session) {
    //     console.log('Unauthorized')
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }

    const { content, keywords, interpretation, mood } = req.body;

    const dream = await Dream.create({
    //   userId: session.user.id,
      userId:Date.now().toString(),
      content,
      keywords,
      interpretation,
      mood,
      createdAt: new Date(),
    });

    res.status(201).json(dream);
  } catch (error) {
    console.error('Error saving dream:', error);
    res.status(500).json({ message: 'Error saving dream' });
  }
}