<script>
	import { superForm } from 'sveltekit-superforms/client';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	let loading = false;

	const {
		form: formValues,
		errors,
		constraints,
		enhance
	} = superForm(data.form, {
		onSubmit: () => {
			loading = true;
		},
		onResult: () => {
			loading = false;
		}
	});
</script>

<form method="POST" action="?/signup" use:enhance>
	<div>
		<label for="email">Email</label>
		<input
			type="email"
			id="email"
			name="email"
			placeholder="you@example.com"
			bind:value={$formValues.email}
			{...$constraints.email}
		/>
		{#if $errors.email}
			<span>{$errors.email}</span>
		{/if}
	</div>
	<div>
		<label for="password">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			placeholder="••••••••"
			bind:value={$formValues.password}
			{...$constraints.password}
		/>
		{#if $errors.password}
			<span>{$errors.password}</span>
		{/if}
	</div>
	{#if form?.error}
		<div>
			<span>{form.error}</span>
		</div>
	{/if}
	<button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign up'}</button>
</form>
{#if form?.success}
	<p>
		Check your email to confirm.<br />You've successfully signed up. Please check your email to
		confirm your account before signing in to the Supabase Auth Demo dashboard
	</p>
{/if}
