<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let statusFilter = data.filters.status;

	function applyFilters() {
		const params = new URLSearchParams();
		if (statusFilter) params.set('status', statusFilter);
		goto(`/dashboard/leads?${params.toString()}`);
	}

	function resetFilters() {
		statusFilter = '';
		goto('/dashboard/leads');
	}

	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<div class="leads-page">
	<h1>Leads Management</h1>

	<div class="filters">
		<select bind:value={statusFilter} on:change={applyFilters}>
			<option value="">All Status</option>
			<option value="new">New</option>
			<option value="contacted">Contacted</option>
			<option value="qualified">Qualified</option>
			<option value="closed">Closed</option>
		</select>

		<button class="reset-btn" on:click={resetFilters}>Reset</button>
	</div>

	<div class="table-section">
		<p class="results-count">{data.leads.length} leads found</p>
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Property</th>
						<th>Message</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.leads as lead}
						<tr>
							<td>{formatDate(lead.createdAt)}</td>
							<td>{lead.name}</td>
							<td>{lead.email || '-'}</td>
							<td><a href="tel:{lead.phone}">{lead.phone}</a></td>
							<td>
								{#if lead.property}
									<a href="/property/{lead.property.id}" target="_blank">
										{lead.property.title}
									</a>
								{:else}
									<em>General inquiry</em>
								{/if}
							</td>
							<td class="message-cell">{lead.message}</td>
							<td>
								<span class="badge {lead.status}">{lead.status}</span>
							</td>
							<td>
								<button class="action-btn view">View</button>
								<button class="action-btn update">Update</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	.leads-page {
		max-width: 1400px;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 2rem;
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

	.message-cell {
		max-width: 300px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: capitalize;
	}

	.badge.new {
		background: #fff3cd;
		color: #856404;
	}

	.badge.contacted {
		background: #cce5ff;
		color: #004085;
	}

	.badge.qualified {
		background: #d4edda;
		color: #155724;
	}

	.badge.closed {
		background: #f8d7da;
		color: #721c24;
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

	.action-btn.view {
		background: #007bff;
		color: white;
	}

	.action-btn.view:hover {
		background: #0056b3;
	}

	.action-btn.update {
		background: #28a745;
		color: white;
	}

	.action-btn.update:hover {
		background: #218838;
	}

	@media (max-width: 768px) {
		.filters {
			flex-direction: column;
		}

		.filters select,
		.reset-btn {
			width: 100%;
		}
	}
</style>
