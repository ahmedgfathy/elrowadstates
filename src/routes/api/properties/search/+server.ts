import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q') || '';
	const type = url.searchParams.get('type') || '';
	const status = url.searchParams.get('status') || '';
	const limit = parseInt(url.searchParams.get('limit') || '50');

	if (!query || query.length < 2) {
		return json({ properties: [], message: 'Query must be at least 2 characters' });
	}

	const where: any = {
		OR: [
			{ title: { contains: query, mode: 'insensitive' } },
			{ description: { contains: query, mode: 'insensitive' } },
			{ region: { contains: query, mode: 'insensitive' } },
			{ category: { contains: query, mode: 'insensitive' } },
			{ address: { contains: query, mode: 'insensitive' } }
		]
	};

	// Apply additional filters
	if (type) where.type = type;
	if (status) where.status = status;

	try {
		const properties = await prisma.property.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			take: limit
		});

		const totalMatches = await prisma.property.count({ where });

		return json({
			properties,
			totalMatches,
			displayedCount: properties.length
		});
	} catch (error) {
		console.error('Search error:', error);
		return json({ error: 'Search failed', properties: [] }, { status: 500 });
	}
};
