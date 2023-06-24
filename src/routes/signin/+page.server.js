import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const session = await event.locals.getSession();

	if (session) {
		throw redirect(303, '/');
	}

	const form = await superValidate(event, signInSchema);

	return {
		form
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	signin: async (event) => {
		const form = await superValidate(event, signInSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { error } = await event.locals.supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					form,
					error: 'Invalid credentials'
				});
			}
			return fail(500, {
				form,
				error: 'Server error. Try again later'
			});
		}

		return {
			form,
			success: true
		};
	}
};
