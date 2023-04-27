<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { clipboard } from '@skeletonlabs/skeleton';
    import { toastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;
	export let form: ActionData;

	let shorturl = '';
	let query = '';
	
	if (data.url_nicknames.data) {
		data.url_nicknames.data.sort((a, b) => a.nickname.localeCompare(b.nickname));
	} else {

	}
	if (form?.success) {
		shorturl = `${data.origin}/f/${form.nickname}`;
    }


</script>

<div>
	<div class="title">
		<div class="text-8xl">Flotsam</div>
		<div class="text-8xl">Flotsam</div>
	</div>
	<p>Share your stuff, the easier way!</p>
</div>

<form method="post" class="my-4">
	<label class="label">
		Full URL
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">https://</div>
			<input type="text" placeholder="www.example.com" name="url" />
		</div>
	</label>

	<label class="label">
		Nickname
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">{data.origin}/f/</div>
			<input type="text" placeholder="jetsam" name="nickname" />
		</div>
	</label>

	<button class="btn variant-filled-tertiary mt-4 mx-auto">Submit</button>
</form>

{#if form?.success == true}
	<div class="card p-2 my-4 grid grid-cols-2">
		<div>
			<h3>New flotsam created!</h3>
			<p>
				Use: <a href={shorturl}> {shorturl}</a>
			</p>
			<p>to get to {form.url}</p>
		</div>
		<button class="btn variant-filled-secondary" use:clipboard={shorturl}>Copy Flotsam Link</button>
	</div>
{:else if form?.success == false}
	<div class="card p-2 my-4">
		<h2>There was an error.</h2>
		<p>Please try again.</p>
		<p>{form.error?.code}: {form.error?.message}</p>
		<p>{form.error?.hint || ''}</p>
		<p>{form.error?.details || ''}</p>
	</div>
{/if}

{#if data.url_nicknames.data?.length}
	<label class='input-group input-group-divider grid-cols-[auto_1fr_auto] my-4'>
		<div class="input-group-shim">Find flotsam</div>
		<input type="search" class='search' name="search" id="search" bind:value={query} placeholder="Search, e.g. dinglehopper">
	</label>
	<div class="table-container">
		<table class="table table-hover table-interactive">
			<thead>
				<tr>
					<th class="table-sort-asc">Nickname</th>
					<th>URL</th>
				</tr>
			</thead>
			<tbody>
				{#each data.url_nicknames.data as entry}
					{#if entry.nickname.includes(query) || entry.url.includes(query) }
						<tr use:clipboard={`${data.origin}/f/${entry.nickname}`} 
							on:click={()=>{
								const t = {
									message: `/f/${entry.nickname} copied!`,
									};
								toastStore.trigger(t);
							}
						}>
							<td><span class="text-surface-600">/f/</span>{entry.nickname}</td>
							<td>{entry.url}</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	.title {
		position: relative;
		height: 100%;
	}

	.title div:nth-child(1) {
		color: transparent;
		-webkit-text-stroke: 2px rgb(var(--theme-font-color-dark));
	}

	.title div:nth-child(2) {
		position: absolute;
		transform: translate(0, -100%);
        color: rgb(var(--theme-font-color-dark));
	    animation: animate 4s ease-in-out infinite;
	}


@keyframes animate {
	0%,
	100% {
		clip-path: polygon(
			0% 45%,
			16% 44%,
			33% 50%,
			54% 60%,
			70% 61%,
			84% 59%,
			100% 52%,
			100% 100%,
			0% 100%
		);
	}

	50% {
		clip-path: polygon(
			0% 60%,
			15% 65%,
			34% 66%,
			51% 62%,
			67% 50%,
			84% 45%,
			100% 46%,
			100% 100%,
			0% 100%
		);
	}
}
</style>
