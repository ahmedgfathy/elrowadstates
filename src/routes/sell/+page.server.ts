import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ url }) => {
	const category = url.searchParams.get('category') || '';
	const region = url.searchParams.get('region') || '';
	const page = parseInt(url.searchParams.get('page') || '1');
	const limit = 12; // Properties per page
	const skip = (page - 1) * limit;

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

	const [properties, totalCount] = await Promise.all([
		prisma.property.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			take: limit,
			skip
		}),
		prisma.property.count({ where })
	]);

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
		selectedRegion: region,
		pagination: {
			currentPage: page,
			totalPages: Math.ceil(totalCount / limit),
			totalCount,
			limit
		}
	};
};
