import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const [totalProperties, activeProperties, totalLeads, newLeads] = await Promise.all([
		prisma.property.count(),
		prisma.property.count({ where: { status: 'active' } }),
		prisma.lead.count(),
		prisma.lead.count({ where: { status: 'new' } })
	]);

	const recentProperties = await prisma.property.findMany({
		take: 5,
		orderBy: { createdAt: 'desc' }
	});

	const recentLeads = await prisma.lead.findMany({
		take: 5,
		orderBy: { createdAt: 'desc' },
		include: {
			property: {
				select: { title: true }
			}
		}
	});

	return {
		stats: {
			totalProperties,
			activeProperties,
			totalLeads,
			newLeads
		},
		recentProperties,
		recentLeads
	};
};
