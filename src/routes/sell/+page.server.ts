import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ url }) => {
	const category = url.searchParams.get('category') || '';
	const region = url.searchParams.get('region') || '';

	const where: any = {
		type: 'sell',
		status: 'active'
	};

	if (category) {
		where.category = category;
	}

	if (region) {
		where.region = region;
	}

	const properties = await prisma.property.findMany({
		where,
		orderBy: { createdAt: 'desc' }
	});

	const categories = await prisma.property.findMany({
		where: { type: 'sell' },
		select: { category: true },
		distinct: ['category']
	});

	const regions = await prisma.property.findMany({
		where: { type: 'sell' },
		select: { region: true },
		distinct: ['region']
	});

	return {
		properties,
		categories: categories.map((c) => c.category),
		regions: regions.map((r) => r.region),
		selectedCategory: category,
		selectedRegion: region
	};
};
