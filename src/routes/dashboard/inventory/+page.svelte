<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let typeFilter = data.filters.type;
	let statusFilter = data.filters.status;

	function applyFilters() {
		const params = new URLSearchParams();
		if (typeFilter) params.set('type', typeFilter);
		if (statusFilter) params.set('status', statusFilter);
		goto(`/dashboard/inventory?${params.toString()}`);
	}

	function resetFilters() {
		typeFilter = '';
		statusFilter = '';
		goto('/dashboard/inventory');
	}

	function formatPrice(price: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0
		}).format(price);
	}
</script>

<div class="inventory-page">
	<div class="page-header">
		<h1>Property Inventory</h1>
		<button class="add-btn">+ Add Property</button>
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

	<div class="table-section">
		<p class="results-count">{data.properties.length} properties found</p>
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Type</th>
						<th>Category</th>
						<th>Region</th>
						<th>Price</th>
						<th>Status</th>
						<th>Views</th>
						<th>Featured</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.properties as property}
						<tr>
							<td>
								<a href="/property/{property.id}" target="_blank">{property.title}</a>
							</td>
							<td>
								<span class="badge {property.type}">{property.type}</span>
							</td>
							<td>{property.category}</td>
							<td>{property.region}</td>
							<td>{formatPrice(property.price)}</td>
							<td>
								<span class="badge {property.status}">{property.status}</span>
							</td>
							<td>{property.views}</td>
							<td>
								{#if property.featured}
									<span class="featured-star">⭐</span>
								{:else}
									<span class="not-featured">-</span>
								{/if}
							</td>
							<td>
								<button class="action-btn edit">Edit</button>
								<button class="action-btn delete">Delete</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
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
	}

	.reset-btn:hover {
		background: #5a6268;
	}

	.table-section {
		background: white;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.results-count {
		margin-bottom: 1rem;
		color: #666;
	}

	.table-container {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background: #f8f9fa;
	}

	th {
		padding: 1rem;
		text-align: left;
		font-weight: 600;
		color: #333;
		border-bottom: 2px solid #e0e0e0;
		white-space: nowrap;
	}

	td {
		padding: 1rem;
		border-bottom: 1px solid #e0e0e0;
	}

	td a {
		color: #0066cc;
		text-decoration: none;
	}

	td a:hover {
		text-decoration: underline;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: capitalize;
	}

	.badge.sell {
		background: #e7f3ff;
		color: #0066cc;
	}

	.badge.rent {
		background: #d4edda;
		color: #155724;
	}

	.badge.active {
		background: #d4edda;
		color: #155724;
	}

	.badge.sold,
	.badge.rented {
		background: #f8d7da;
		color: #721c24;
	}

	.featured-star {
		font-size: 1.25rem;
	}

	.not-featured {
		color: #ccc;
	}

	.action-btn {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 600;
		margin-right: 0.5rem;
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
	}
</style>
