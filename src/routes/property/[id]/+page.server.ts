import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const property = await prisma.property.findUnique({
		where: { id: params.id }
	});

	if (!property) {
		throw error(404, 'Property not found');
	}

	// Increment view count
	await prisma.property.update({
		where: { id: params.id },
		data: { views: { increment: 1 } }
	});

	return {
		property
	};
};
