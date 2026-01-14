import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ url }) => {
	const type = url.searchParams.get('type') || '';
	const status = url.searchParams.get('status') || '';

	const where: any = {};

	if (type) where.type = type;
	if (status) where.status = status;

	// Load only first 50 properties for performance
	const properties = await prisma.property.findMany({
		where,
		orderBy: { createdAt: 'desc' },
		take: 50
	});

	// Get total count for display
	const totalCount = await prisma.property.count({ where });

	return {
		properties,
		totalCount,
		filters: { type, status }
	};
};
