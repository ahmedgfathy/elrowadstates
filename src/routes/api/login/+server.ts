import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key-change-in-production';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { username, password } = await request.json();

	try {
		const user = await prisma.user.findUnique({
			where: { username }
		});

		if (!user) {
			return json({ error: 'Invalid credentials' }, { status: 401 });
		}

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) {
			return json({ error: 'Invalid credentials' }, { status: 401 });
		}

		const token = jwt.sign(
			{ username: user.username, role: user.role },
			JWT_SECRET,
			{ expiresIn: '7d' }
		);

		cookies.set('auth_token', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		return json({ success: true, username: user.username });
	} catch (error) {
		console.error('Login error:', error);
		return json({ error: 'Server error' }, { status: 500 });
	}
};
