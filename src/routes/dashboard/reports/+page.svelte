<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	function formatPrice(price: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0
		}).format(price);
	}
</script>

<div class="reports-page">
	<h1>Reports & Analytics</h1>

	<div class="stats-section">
		<div class="stat-card">
			<h3>Total Property Views</h3>
			<p class="big-stat">{data.totalViews.toLocaleString()}</p>
		</div>
	</div>

	<div class="charts-grid">
		<div class="chart-card">
			<h2>Properties by Type</h2>
			<div class="chart-content">
				{#each data.propertiesByType as item}
					<div class="chart-row">
						<span class="label">{item.type}</span>
						<span class="value">{item._count}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="chart-card">
			<h2>Properties by Status</h2>
			<div class="chart-content">
				{#each data.propertiesByStatus as item}
					<div class="chart-row">
						<span class="label">{item.status}</span>
						<span class="value">{item._count}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="chart-card">
			<h2>Leads by Status</h2>
			<div class="chart-content">
				{#each data.leadsByStatus as item}
					<div class="chart-row">
						<span class="label">{item.status}</span>
						<span class="value">{item._count}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="chart-card">
			<h2>Properties by Category</h2>
			<div class="chart-content">
				{#each data.propertiesByCategory as item}
					<div class="chart-row">
						<span class="label">{item.category}</span>
						<span class="value">{item._count}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="table-section">
		<h2>Top Viewed Properties</h2>
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Title</th>
						<th>Type</th>
						<th>Price</th>
						<th>Views</th>
					</tr>
				</thead>
				<tbody>
					{#each data.topViewedProperties as property, i}
						<tr>
							<td>
								{#if i === 0}
									🥇
								{:else if i === 1}
									🥈
								{:else if i === 2}
									🥉
								{:else}
									#{i + 1}
								{/if}
							</td>
							<td>
								<a href="/property/{property.id}" target="_blank">{property.title}</a>
							</td>
							<td>
								<span class="badge {property.type}">{property.type}</span>
							</td>
							<td>{formatPrice(property.price)}</td>
							<td><strong>{property.views}</strong></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	.reports-page {
		max-width: 1400px;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 2rem;
		color: #333;
	}

	.stats-section {
		margin-bottom: 2rem;
	}

	.stat-card {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.stat-card h3 {
		color: #666;
		margin-bottom: 1rem;
	}

	.big-stat {
		font-size: 3rem;
		font-weight: 700;
		color: #0066cc;
		margin: 0;
	}

	.charts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.chart-card {
		background: white;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.chart-card h2 {
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
		color: #333;
	}

	.chart-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.chart-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: #f8f9fa;
		border-radius: 6px;
	}

	.chart-row .label {
		text-transform: capitalize;
		font-weight: 500;
		color: #333;
	}

	.chart-row .value {
		font-weight: 700;
		color: #0066cc;
		font-size: 1.25rem;
	}

	.table-section {
		background: white;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.table-section h2 {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
		color: #333;
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

	@media (max-width: 768px) {
		.charts-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
