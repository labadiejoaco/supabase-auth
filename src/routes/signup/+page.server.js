import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const session = await event.locals.getSession();

	if (session) {
		throw redirect(303, '/');
	}

	const form = await superValidate(event, signUpSchema);

	return {
		form
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	signup: async (event) => {
		const form = await superValidate(event, signUpSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { error } = await event.locals.supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				emailRedirectTo: `${event.url.origin}/auth/callback`
			}
		});

		if (error) {
			return fail(500, {
				form,
				error: 'Internal Server Error'
			});
		}

		return {
			form,
			success: true
		};
	}
};
