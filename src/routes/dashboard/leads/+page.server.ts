import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ url }) => {
	const status = url.searchParams.get('status') || '';

	const where: any = {};
	if (status) where.status = status;

	const leads = await prisma.lead.findMany({
		where,
		orderBy: { createdAt: 'desc' },
		include: {
			property: {
				select: { title: true, id: true }
			}
		}
	});

	return {
		leads,
		filters: { status }
	};
};
