<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import PropertyCard from '$lib/components/PropertyCard.svelte';

	export let data: PageData;

	let typeFilter = data.filters.type;
	let statusFilter = data.filters.status;
	let searchQuery = data.filters.search;
	let searchTimeout: any;

	function applyFilters() {
		const params = new URLSearchParams();
		if (typeFilter) params.set('type', typeFilter);
		if (statusFilter) params.set('status', statusFilter);
		if (searchQuery) params.set('search', searchQuery);
		goto(`/dashboard/inventory?${params.toString()}`);
	}

	function handleSearch() {
		// Debounce search to avoid too many requests
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			applyFilters();
		}, 500);
	}

	function resetFilters() {
		typeFilter = '';
		statusFilter = '';
		searchQuery = '';
		goto('/dashboard/inventory');
	}
</script>

<div class="inventory-page">
	<div class="page-header">
		<h1>Property Inventory</h1>
		<button class="add-btn">+ Add Property</button>
	</div>

	<div class="search-section">
		<div class="search-bar">
			<svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path
					d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<input
				type="text"
				placeholder="Search by title, description, region, category, address..."
				bind:value={searchQuery}
				on:input={handleSearch}
			/>
			{#if searchQuery}
				<button class="clear-search" on:click={() => { searchQuery = ''; applyFilters(); }}>
					✕
				</button>
			{/if}
		</div>
	</div>

	<div class="filters">
		<select bind:value={typeFilter} on:change={applyFilters}>
			<option value="">All Types</option>
			<option value="sell">For Sale</option>
			<option value="rent">For Rent</option>
		</select>

		<select bind:value={statusFilter} on:change={applyFilters}>
			<option value="">All Status</option>
			<option value="active">Active</option>
			<option value="sold">Sold</option>
			<option value="rented">Rented</option>
		</select>

		<button class="reset-btn" on:click={resetFilters}>Reset</button>
	</div>

	<div class="results-section">
		<p class="results-count">{data.properties.length} properties found</p>
		
		{#if data.properties.length > 0}
			<div class="properties-grid">
				{#each data.properties as property}
					<div class="property-card-wrapper">
						<PropertyCard {property} />
						<div class="card-actions">
							<button class="action-btn edit">Edit</button>
							<button class="action-btn delete">Delete</button>
							<div class="card-stats">
								<span class="views">👁️ {property.views}</span>
								{#if property.featured}
									<span class="featured-badge">⭐ Featured</span>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="no-results">
				<p>No properties found</p>
				<button class="reset-btn" on:click={resetFilters}>Clear Filters</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.inventory-page {
		max-width: 1400px;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 2rem;
		color: #333;
		margin: 0;
	}

	.add-btn {
		background: #28a745;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s;
	}

	.add-btn:hover {
		background: #218838;
	}

	.search-section {
		margin-bottom: 1.5rem;
	}

	.search-bar {
		position: relative;
		display: flex;
		align-items: center;
		background: white;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		padding: 0.75rem 1rem;
		transition: border-color 0.3s;
	}

	.search-bar:focus-within {
		border-color: #0066cc;
	}

	.search-icon {
		color: #999;
		margin-right: 0.75rem;
		flex-shrink: 0;
	}

	.search-bar input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 1rem;
		color: #333;
	}

	.search-bar input::placeholder {
		color: #999;
	}

	.clear-search {
		background: none;
		border: none;
		color: #999;
		font-size: 1.25rem;
		cursor: pointer;
		padding: 0 0.5rem;
		transition: color 0.3s;
	}

	.clear-search:hover {
		color: #333;
	}

	.filters {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.filters select {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 6px;
		background: white;
		font-size: 1rem;
		cursor: pointer;
	}

	.reset-btn {
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

	.results-section {
		margin-top: 2rem;
	}

	.results-count {
		margin-bottom: 1.5rem;
		color: #666;
		font-size: 1rem;
	}

	.properties-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 2rem;
	}

	.property-card-wrapper {
		position: relative;
	}

	.card-actions {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	.action-btn {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 600;
		transition: background 0.3s;
	}

	.action-btn.edit {
		background: #007bff;
		color: white;
	}

	.action-btn.edit:hover {
		background: #0056b3;
	}

	.action-btn.delete {
		background: #dc3545;
		color: white;
	}

	.action-btn.delete:hover {
		background: #c82333;
	}

	.card-stats {
		margin-left: auto;
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.views {
		font-size: 0.875rem;
		color: #666;
	}

	.featured-badge {
		font-size: 0.875rem;
		color: #f59e0b;
		font-weight: 600;
	}

	.no-results {
		text-align: center;
		padding: 3rem 1rem;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.no-results p {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 1.5rem;
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.add-btn {
			width: 100%;
		}

		.filters {
			flex-direction: column;
		}

		.filters select,
		.reset-btn {
			width: 100%;
		}

		.properties-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.search-bar input {
			font-size: 0.875rem;
		}

		.card-actions {
			flex-direction: column;
			align-items: stretch;
		}

		.card-stats {
			margin-left: 0;
			justify-content: center;
		}

		.action-btn {
			width: 100%;
		}
	}
</style>
