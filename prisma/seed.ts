import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	// Create default user
	const hashedPassword = await bcrypt.hash('zerocall', 10);
	
	await prisma.user.upsert({
		where: { username: 'xinreal' },
		update: {},
		create: {
			username: 'xinreal',
			password: hashedPassword,
			role: 'admin'
		}
	});

	console.log('Default user created: xinreal / zerocall');

	// Create hero slides
	await prisma.heroSlide.deleteMany({});
	await prisma.heroSlide.createMany({
		data: [
			{
				imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
				title: 'Find Your Dream Home',
				subtitle: 'Browse our exclusive collection of properties',
				order: 1
			},
			{
				imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
				title: 'Luxury Living',
				subtitle: 'Premium properties in prime locations',
				order: 2
			},
			{
				imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
				title: 'Your Perfect Property',
				subtitle: 'Expert guidance for all your real estate needs',
				order: 3
			}
		]
	});

	console.log('Hero slides created');

	// Create sample properties
	const properties = [
		{
			title: 'Luxury Villa in Downtown',
			description: 'Stunning 4-bedroom villa with modern amenities, spacious living areas, and beautiful garden. Perfect for families seeking comfort and style.',
			price: 850000,
			type: 'sell',
			category: 'Villa',
			region: 'Downtown',
			bedrooms: 4,
			bathrooms: 3,
			area: 350,
			address: '123 Main Street, Downtown',
			images: [
				'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
				'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
			],
			featured: true,
			views: 245,
			status: 'active'
		},
		{
			title: 'Modern Apartment Near City Center',
			description: 'Beautiful 2-bedroom apartment with contemporary design, fully furnished, and close to all amenities. Ideal for young professionals.',
			price: 2500,
			type: 'rent',
			category: 'Apartment',
			region: 'City Center',
			bedrooms: 2,
			bathrooms: 2,
			area: 120,
			address: '456 Park Avenue',
			images: [
				'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
				'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
			],
			featured: true,
			views: 189,
			status: 'active'
		},
		{
			title: 'Spacious Family House',
			description: 'Charming 3-bedroom house with large backyard, garage, and quiet neighborhood. Perfect for growing families.',
			price: 520000,
			type: 'sell',
			category: 'House',
			region: 'Suburbs',
			bedrooms: 3,
			bathrooms: 2,
			area: 200,
			address: '789 Oak Street',
			images: [
				'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
				'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
			],
			featured: false,
			views: 156,
			status: 'active'
		},
		{
			title: 'Cozy Studio Apartment',
			description: 'Compact and efficient studio apartment perfect for students or single professionals. Includes all utilities.',
			price: 1200,
			type: 'rent',
			category: 'Studio',
			region: 'University District',
			bedrooms: 1,
			bathrooms: 1,
			area: 45,
			address: '321 College Road',
			images: [
				'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
				'https://images.unsplash.com/photo-1493809842364-78817add7ffb'
			],
			featured: false,
			views: 98,
			status: 'active'
		},
		{
			title: 'Penthouse with City Views',
			description: 'Luxurious penthouse with panoramic city views, rooftop terrace, and premium finishes throughout. The epitome of urban living.',
			price: 1250000,
			type: 'sell',
			category: 'Penthouse',
			region: 'City Center',
			bedrooms: 3,
			bathrooms: 3,
			area: 280,
			address: '555 Skyline Tower',
			images: [
				'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
				'https://images.unsplash.com/photo-1600607687644-c7171b42498b'
			],
			featured: true,
			views: 312,
			status: 'active'
		},
		{
			title: 'Beachfront Condo',
			description: 'Stunning 2-bedroom condo with direct beach access, modern kitchen, and ocean views. Resort-style living at its finest.',
			price: 3800,
			type: 'rent',
			category: 'Condo',
			region: 'Beachfront',
			bedrooms: 2,
			bathrooms: 2,
			area: 150,
			address: '777 Ocean Drive',
			images: [
				'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
				'https://images.unsplash.com/photo-1600566752355-35792bedcfea'
			],
			featured: true,
			views: 267,
			status: 'active'
		}
	];

	for (const property of properties) {
		await prisma.property.create({ data: property });
	}

	console.log('Sample properties created');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
