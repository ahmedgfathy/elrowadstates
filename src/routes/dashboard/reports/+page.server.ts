import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const [
		propertiesByType,
		propertiesByStatus,
		propertiesByCategory,
		leadsByStatus,
		totalViews
	] = await Promise.all([
		prisma.property.groupBy({
			by: ['type'],
			_count: true
		}),
		prisma.property.groupBy({
			by: ['status'],
			_count: true
		}),
		prisma.property.groupBy({
			by: ['category'],
			_count: true
		}),
		prisma.lead.groupBy({
			by: ['status'],
			_count: true
		}),
		prisma.property.aggregate({
			_sum: { views: true }
		})
	]);

	const topViewedProperties = await prisma.property.findMany({
		take: 10,
		orderBy: { views: 'desc' },
		select: {
			id: true,
			title: true,
			views: true,
			type: true,
			price: true
		}
	});

	return {
		propertiesByType,
		propertiesByStatus,
		propertiesByCategory,
		leadsByStatus,
		totalViews: totalViews._sum.views || 0,
		topViewedProperties
	};
};
