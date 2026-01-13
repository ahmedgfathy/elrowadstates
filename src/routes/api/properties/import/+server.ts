import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const POST: RequestHandler = async ({ request, cookies }) => {
	// Check authentication
	const token = cookies.get('auth_token');
	if (!token) {
		console.log('No auth token found in cookies');
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { properties } = await request.json();

		console.log('Received import request with properties:', properties?.length);

		if (!Array.isArray(properties) || properties.length === 0) {
			return json({ error: 'Invalid properties data' }, { status: 400 });
		}

		// Process in batches to avoid memory issues
		const BATCH_SIZE = 50;
		const createdProperties = [];
		
		for (let i = 0; i < properties.length; i += BATCH_SIZE) {
			const batch = properties.slice(i, i + BATCH_SIZE);
			console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}, items ${i + 1} to ${Math.min(i + BATCH_SIZE, properties.length)}`);
			
			const batchResults = await prisma.$transaction(
				batch.map((property) => {
					return prisma.property.create({
						data: {
							title: property.title || 'Untitled Property',
							description: property.description || '',
							price: parseFloat(property.price) || 0,
							type: property.type === 'rent' ? 'rent' : 'sell',
							category: property.category || 'apartment',
							region: property.region || 'unknown',
							bedrooms: property.bedrooms ? parseInt(property.bedrooms) : undefined,
							bathrooms: property.bathrooms ? parseInt(property.bathrooms) : undefined,
							area: property.area ? parseFloat(property.area) : undefined,
							address: property.address || undefined,
							images: Array.isArray(property.images) ? property.images : [],
							featured: property.featured === true || property.featured === 'true',
							views: 0,
							status: property.status || 'active'
						}
					});
				})
			);
			
			createdProperties.push(...batchResults);
			console.log(`Batch complete. Total created so far: ${createdProperties.length}`);
		}

		console.log('Successfully created all properties:', createdProperties.length);

		return json({
			success: true,
			count: createdProperties.length,
			properties: createdProperties
		});
	} catch (error) {
		console.error('Import error:', error);
		return json({ 
			error: 'Failed to import properties', 
			details: error instanceof Error ? error.message : 'Unknown error'
		}, { status: 500 });
	}
};
