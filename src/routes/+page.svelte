<script lang="ts">
	import type { PageData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';
	import HeroSlideshow from '$lib/components/HeroSlideshow.svelte';
	import PropertyCard from '$lib/components/PropertyCard.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: PageData;
</script>

<Navbar />

<main>
	<HeroSlideshow slides={data.heroSlides} />

	<section class="featured-properties">
		<div class="container">
			<h2>Featured Properties</h2>
			<div class="properties-grid">
				{#each data.featuredProperties as property}
					<PropertyCard {property} />
				{/each}
			</div>
		</div>
	</section>

	<section class="most-viewed">
		<div class="container">
			<h2>Most Viewed Properties</h2>
			<div class="properties-grid">
				{#each data.mostViewedProperties as property}
					<PropertyCard {property} />
				{/each}
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	main {
		min-height: 100vh;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.featured-properties,
	.most-viewed {
		padding: 60px 0;
	}

	h2 {
		font-size: 2.5rem;
		margin-bottom: 40px;
		text-align: center;
		color: #333;
	}

	.properties-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 30px;
	}

	.most-viewed {
		background-color: #f8f9fa;
	}
</style>
