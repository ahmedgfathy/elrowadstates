import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		
		const lead = await prisma.lead.create({
			data: {
				name: data.name,
				email: data.email || null,
				phone: data.phone,
				message: data.message,
				propertyId: data.propertyId || null
			}
		});

		return json({ success: true, id: lead.id });
	} catch (error) {
		console.error('Error creating lead:', error);
		return json({ error: 'Failed to create lead' }, { status: 500 });
	}
};
