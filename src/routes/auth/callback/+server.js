import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals: { supabase } }) {
	const code = url.searchParams.get('code');

	if (code) {
		try {
			await supabase.auth.exchangeCodeForSession(code);
		} catch (error) {
			throw redirect(303, '/signin');
		}
	}

	throw redirect(303, '/');
}
