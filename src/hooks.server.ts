import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key-change-in-production';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('auth_token');

	if (token) {
		try {
			const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: string };
			event.locals.user = {
				username: decoded.username,
				role: decoded.role
			};
		} catch (err) {
			event.cookies.delete('auth_token', { path: '/' });
		}
	}

	return resolve(event);
};
