<script lang="ts">
	import type { ActionData, PageData } from "./$types";

    export let form: ActionData;
    export let page: PageData;
</script>

<h1>Welcome to Flotsam</h1>
<p>Share your stuff, the easier way!</p>

<form method="post">
    <label>
        Full URL
        <input type="text" name="url">
    </label>

    <label>
        Nickname
        <input type="text" name="nickname">
    </label>

    <button>Submit</button>
</form>

{#if form?.success==true}
    <h2>New flotsam created!</h2>
    <p>Use: <a href='flotsam.vercel.app/f/${form.nickname}'>flotsam.vercel.app/f/{form.nickname}</a></p>
    <p>to get to {form.url}</p>
{:else if form?.success==false}
    <h2>There was an error.</h2>
    <p>Please try again.</p>
    <p>{form.error?.code}: {form.error?.message}</p>
    <p>{form.error?.hint || ''}</p>
    <p>{form.error?.details || ''}</p>
{/if}