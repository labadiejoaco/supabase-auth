<script>
	import { enhance } from '$app/forms';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<form method="POST" action="?/logout" use:enhance>
	{#if form?.error}
		<div>
			<span>{form.error}</span>
		</div>
	{/if}
	<button type="submit">Logout</button>
</form>
