import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const heroSlides = await prisma.heroSlide.findMany({
		where: { active: true },
		orderBy: { order: 'asc' }
	});

	const featuredProperties = await prisma.property.findMany({
		where: { featured: true, status: 'active' },
		take: 6,
		orderBy: { createdAt: 'desc' }
	});

	const mostViewedProperties = await prisma.property.findMany({
		where: { status: 'active' },
		take: 6,
		orderBy: { views: 'desc' }
	});

	return {
		heroSlides,
		featuredProperties,
		mostViewedProperties
	};
};
