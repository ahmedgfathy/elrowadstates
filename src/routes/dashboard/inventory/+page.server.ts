import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ url }) => {
	const type = url.searchParams.get('type') || '';
	const status = url.searchParams.get('status') || '';
	const search = url.searchParams.get('search') || '';

	const where: any = {};

	if (type) where.type = type;
	if (status) where.status = status;

	// Add search functionality across multiple fields
	if (search) {
		where.OR = [
			{ title: { contains: search, mode: 'insensitive' } },
			{ description: { contains: search, mode: 'insensitive' } },
			{ region: { contains: search, mode: 'insensitive' } },
			{ category: { contains: search, mode: 'insensitive' } },
			{ address: { contains: search, mode: 'insensitive' } }
		];
	}

	const properties = await prisma.property.findMany({
		where,
		orderBy: { createdAt: 'desc' }
	});

	return {
		properties,
		filters: { type, status, search }
	};
};
