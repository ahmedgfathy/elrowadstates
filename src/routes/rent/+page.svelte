<script lang="ts">
	import type { PageData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';
	import PropertyCard from '$lib/components/PropertyCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let selectedCategory = data.selectedCategory;
	let selectedRegion = data.selectedRegion;

	function applyFilters() {
		const params = new URLSearchParams();
		if (selectedCategory) params.set('category', selectedCategory);
		if (selectedRegion) params.set('region', selectedRegion);
		goto(`/rent?${params.toString()}`);
	}

	function resetFilters() {
		selectedCategory = '';
		selectedRegion = '';
		goto('/rent');
	}
</script>

<Navbar />

<main>
	<div class="hero-section">
		<div class="hero-content">
			<h1>Properties for Rent</h1>
			<p>Discover comfortable rental properties in prime locations</p>
		</div>
	</div>

	<section class="content">
		<div class="container">
			<div class="filters">
				<div class="filter-group">
					<label for="category">Category</label>
					<select id="category" bind:value={selectedCategory} on:change={applyFilters}>
						<option value="">All Categories</option>
						{#each data.categories as category}
							<option value={category}>{category}</option>
						{/each}
					</select>
				</div>

				<div class="filter-group">
					<label for="region">Region</label>
					<select id="region" bind:value={selectedRegion} on:change={applyFilters}>
						<option value="">All Regions</option>
						{#each data.regions as region}
							<option value={region}>{region}</option>
						{/each}
					</select>
				</div>

				<button class="reset-btn" on:click={resetFilters}>Reset Filters</button>
			</div>

			<div class="results-count">
				<p>{data.properties.length} properties found</p>
			</div>

			{#if data.properties.length > 0}
				<div class="properties-grid">
					{#each data.properties as property}
						<PropertyCard {property} />
					{/each}
				</div>
			{:else}
				<div class="no-results">
					<p>No properties found matching your criteria.</p>
				</div>
			{/if}
		</div>
	</section>
</main>

<Footer />

<style>
	.hero-section {
		height: 300px;
		background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
			url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00') center/cover;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		text-align: center;
	}

	.hero-content h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
	}

	.hero-content p {
		font-size: 1.5rem;
		text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
	}

	.content {
		padding: 60px 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.filters {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.filter-group {
		flex: 1;
		min-width: 200px;
	}

	.filter-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #333;
	}

	.filter-group select {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 1rem;
		background: white;
		cursor: pointer;
	}

	.reset-btn {
		align-self: flex-end;
		padding: 0.75rem 1.5rem;
		background: #6c757d;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 600;
		transition: background 0.3s;
	}

	.reset-btn:hover {
		background: #5a6268;
	}

	.results-count {
		margin-bottom: 2rem;
		color: #666;
	}

	.properties-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 30px;
	}

	.no-results {
		text-align: center;
		padding: 4rem 2rem;
		color: #666;
		font-size: 1.2rem;
	}

	@media (max-width: 768px) {
		.hero-content h1 {
			font-size: 2rem;
		}

		.hero-content p {
			font-size: 1.2rem;
		}

		.filters {
			flex-direction: column;
		}

		.reset-btn {
			align-self: stretch;
		}
	}
</style>
