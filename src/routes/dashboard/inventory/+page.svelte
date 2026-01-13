<script lang="ts">
import type { PageData } from './$types';
import { goto } from '$app/navigation';

export let data: PageData;

let typeFilter = data.filters.type;
let statusFilter = data.filters.status;
let searchQuery = '';
let selectedProperty: any = null;
let showDetailsPanel = false;

$: filteredProperties = data.properties.filter(property => {
const matchesSearch = !searchQuery || 
property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
property.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
property.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
(property.address && property.address.toLowerCase().includes(searchQuery.toLowerCase()));

return matchesSearch;
});

function applyFilters() {
const params = new URLSearchParams();
if (typeFilter) params.set('type', typeFilter);
if (statusFilter) params.set('status', statusFilter);
goto(`/dashboard/inventory?${params.toString()}`);
}

function resetFilters() {
typeFilter = '';
statusFilter = '';
searchQuery = '';
goto('/dashboard/inventory');
}

function openDetails(property: any) {
selectedProperty = property;
showDetailsPanel = true;
}

function closeDetails() {
showDetailsPanel = false;
setTimeout(() => {
selectedProperty = null;
}, 300);
}

function handleOverlayClick(event: MouseEvent) {
if (event.target === event.currentTarget) {
closeDetails();
}
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
/>
{#if searchQuery}
<button class="clear-search" on:click={() => { searchQuery = ''; }}>
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
<p class="results-count">{filteredProperties.length} properties found</p>

{#if filteredProperties.length > 0}
<div class="properties-grid">
{#each filteredProperties as property}
<div class="property-card-wrapper">
<div on:click={() => openDetails(property)} on:keydown={(e) => e.key === 'Enter' && openDetails(property)} role="button" tabindex="0">
<div class="property-card">
<div class="image-container">
{#if property.images && property.images.length > 0}
<img src={property.images[0]} alt={property.title} />
{:else}
<img
src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
alt={property.title}
/>
{/if}
<span class="type-badge" class:rent={property.type === 'rent'}>
{property.type === 'sell' ? 'For Sale' : 'For Rent'}
</span>
</div>
<div class="card-content">
<h3>{property.title}</h3>
<p class="price">{formatPrice(property.price)}{property.type === 'rent' ? '/mo' : ''}</p>
<p class="location">{property.region}</p>
<div class="features">
{#if property.bedrooms}
<span>🛏️ {property.bedrooms} Beds</span>
{/if}
{#if property.bathrooms}
<span>🚿 {property.bathrooms} Baths</span>
{/if}
{#if property.area}
<span>📐 {property.area} m²</span>
{/if}
</div>
</div>
</div>
</div>
<div class="card-actions">
<button class="action-btn edit" on:click|stopPropagation={() => openDetails(property)}>View Details</button>
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

{#if showDetailsPanel && selectedProperty}
<div class="details-overlay" on:click={handleOverlayClick} role="button" tabindex="-1">
<div class="details-panel" class:show={showDetailsPanel}>
<div class="panel-header">
<h2>Property Details</h2>
<button class="close-btn" on:click={closeDetails}>✕</button>
</div>

<div class="panel-content">
<div class="property-images">
{#if selectedProperty.images && selectedProperty.images.length > 0}
<img src={selectedProperty.images[0]} alt={selectedProperty.title} />
{:else}
<img
src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
alt={selectedProperty.title}
/>
{/if}
</div>

<div class="detail-section">
<h3>{selectedProperty.title}</h3>
<p class="detail-price">{formatPrice(selectedProperty.price)}{selectedProperty.type === 'rent' ? '/month' : ''}</p>
</div>

<div class="detail-section">
<label>Type</label>
<p class="badge {selectedProperty.type}">{selectedProperty.type === 'sell' ? 'For Sale' : 'For Rent'}</p>
</div>

<div class="detail-section">
<label>Status</label>
<p class="badge {selectedProperty.status}">{selectedProperty.status}</p>
</div>

<div class="detail-section">
<label>Category</label>
<p>{selectedProperty.category}</p>
</div>

<div class="detail-section">
<label>Region</label>
<p>{selectedProperty.region}</p>
</div>

{#if selectedProperty.address}
<div class="detail-section">
<label>Address</label>
<p>{selectedProperty.address}</p>
</div>
{/if}

<div class="detail-section">
<label>Property Features</label>
<div class="property-features">
{#if selectedProperty.bedrooms}
<div class="feature-item">
<span class="feature-icon">🛏️</span>
<span>{selectedProperty.bedrooms} Bedrooms</span>
</div>
{/if}
{#if selectedProperty.bathrooms}
<div class="feature-item">
<span class="feature-icon">🚿</span>
<span>{selectedProperty.bathrooms} Bathrooms</span>
</div>
{/if}
{#if selectedProperty.area}
<div class="feature-item">
<span class="feature-icon">📐</span>
<span>{selectedProperty.area} m²</span>
</div>
{/if}
</div>
</div>

<div class="detail-section">
<label>Description</label>
<p class="description">{selectedProperty.description}</p>
</div>

<div class="detail-section">
<label>Statistics</label>
<div class="stats-grid">
<div class="stat-item">
<span class="stat-label">Views</span>
<span class="stat-value">👁️ {selectedProperty.views}</span>
</div>
<div class="stat-item">
<span class="stat-label">Featured</span>
<span class="stat-value">{selectedProperty.featured ? '⭐ Yes' : 'No'}</span>
</div>
</div>
</div>

<div class="detail-section">
<label>Property ID</label>
<p class="property-id">{selectedProperty.id}</p>
</div>
</div>

<div class="panel-actions">
<button class="btn-edit">Edit Property</button>
<button class="btn-delete">Delete Property</button>
</div>
</div>
</div>
{/if}

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

.property-card {
display: block;
background: white;
border-radius: 12px;
overflow: hidden;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
transition: transform 0.3s, box-shadow 0.3s;
cursor: pointer;
}

.property-card:hover {
transform: translateY(-5px);
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.image-container {
position: relative;
height: 220px;
overflow: hidden;
}

.image-container img {
width: 100%;
height: 100%;
object-fit: cover;
transition: transform 0.3s;
}

.property-card:hover .image-container img {
transform: scale(1.05);
}

.type-badge {
position: absolute;
top: 12px;
right: 12px;
background: #0066cc;
color: white;
padding: 6px 12px;
border-radius: 6px;
font-size: 0.875rem;
font-weight: 600;
}

.type-badge.rent {
background: #28a745;
}

.card-content {
padding: 20px;
}

.card-content h3 {
margin: 0 0 10px 0;
font-size: 1.25rem;
color: #333;
}

.card-content .price {
font-size: 1.5rem;
font-weight: 700;
color: #0066cc;
margin: 0 0 8px 0;
}

.card-content .location {
color: #666;
margin: 0 0 15px 0;
display: flex;
align-items: center;
gap: 5px;
}

.features {
display: flex;
gap: 15px;
flex-wrap: wrap;
color: #666;
font-size: 0.875rem;
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

.details-overlay {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.5);
z-index: 1000;
display: flex;
justify-content: flex-end;
animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
from {
opacity: 0;
}
to {
opacity: 1;
}
}

.details-panel {
background: white;
width: 100%;
max-width: 600px;
height: 100%;
overflow-y: auto;
transform: translateX(100%);
transition: transform 0.3s ease-in-out;
display: flex;
flex-direction: column;
}

.details-panel.show {
transform: translateX(0);
}

.panel-header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 1.5rem;
border-bottom: 1px solid #e0e0e0;
position: sticky;
top: 0;
background: white;
z-index: 10;
}

.panel-header h2 {
margin: 0;
font-size: 1.5rem;
color: #333;
}

.close-btn {
background: none;
border: none;
font-size: 1.5rem;
cursor: pointer;
color: #666;
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
transition: background 0.3s;
}

.close-btn:hover {
background: #f0f0f0;
color: #333;
}

.panel-content {
flex: 1;
padding: 1.5rem;
overflow-y: auto;
}

.property-images {
margin-bottom: 1.5rem;
border-radius: 12px;
overflow: hidden;
}

.property-images img {
width: 100%;
height: 300px;
object-fit: cover;
}

.detail-section {
margin-bottom: 1.5rem;
padding-bottom: 1.5rem;
border-bottom: 1px solid #f0f0f0;
}

.detail-section:last-child {
border-bottom: none;
}

.detail-section label {
display: block;
font-weight: 600;
color: #666;
font-size: 0.875rem;
margin-bottom: 0.5rem;
text-transform: uppercase;
letter-spacing: 0.5px;
}

.detail-section h3 {
margin: 0 0 0.5rem 0;
font-size: 1.75rem;
color: #333;
}

.detail-section p {
margin: 0;
color: #333;
line-height: 1.6;
}

.detail-price {
font-size: 2rem;
font-weight: 700;
color: #0066cc;
margin: 0;
}

.description {
white-space: pre-wrap;
}

.property-features {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
gap: 1rem;
}

.feature-item {
display: flex;
align-items: center;
gap: 0.5rem;
padding: 0.75rem;
background: #f8f9fa;
border-radius: 8px;
}

.feature-icon {
font-size: 1.5rem;
}

.stats-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 1rem;
}

.stat-item {
padding: 1rem;
background: #f8f9fa;
border-radius: 8px;
text-align: center;
}

.stat-label {
display: block;
font-size: 0.875rem;
color: #666;
margin-bottom: 0.5rem;
}

.stat-value {
display: block;
font-size: 1.25rem;
font-weight: 600;
color: #333;
}

.property-id {
font-family: monospace;
font-size: 0.875rem;
color: #666;
background: #f8f9fa;
padding: 0.5rem;
border-radius: 4px;
}

.badge {
display: inline-block;
padding: 0.5rem 1rem;
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

.panel-actions {
padding: 1.5rem;
border-top: 1px solid #e0e0e0;
display: flex;
gap: 1rem;
background: white;
position: sticky;
bottom: 0;
}

.btn-edit,
.btn-delete {
flex: 1;
padding: 0.75rem 1.5rem;
border: none;
border-radius: 6px;
font-weight: 600;
cursor: pointer;
transition: background 0.3s;
}

.btn-edit {
background: #007bff;
color: white;
}

.btn-edit:hover {
background: #0056b3;
}

.btn-delete {
background: #dc3545;
color: white;
}

.btn-delete:hover {
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

.details-panel {
max-width: 100%;
}

.property-images img {
height: 200px;
}

.panel-actions {
flex-direction: column;
}
}
</style>
