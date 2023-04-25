<script lang="ts">
	// Your selected Skeleton theme:
	// import '@skeletonlabs/skeleton/themes/theme-haindigo.css';
    import '$src/theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '$src/app.postcss';


	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<style>

</style>

<div class='flex flex-col p-4 max-w-3xl mx-auto'>
    <div class='container mx-auto px-4'>
        <slot />
    </div>
</div>
