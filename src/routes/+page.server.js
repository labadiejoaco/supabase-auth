import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, '/signin');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	logout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			return fail(500, {
				error: 'Server error. Try again later'
			});
		}

		return {
			success: true
		};
	}
};
