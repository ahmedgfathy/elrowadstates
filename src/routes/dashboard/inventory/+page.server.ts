import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ url }) => {
	const type = url.searchParams.get('type') || '';
	const status = url.searchParams.get('status') || '';

	const where: any = {};

	if (type) where.type = type;
	if (status) where.status = status;

	const properties = await prisma.property.findMany({
		where,
		orderBy: { createdAt: 'desc' }
	});

	return {
		properties,
		filters: { type, status }
	};
};
