<script lang="ts">
	export let property: any;

	function formatPrice(price: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0
		}).format(price);
	}
</script>

<a href="/property/{property.id}" class="property-card">
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
</a>

<style>
	.property-card {
		display: block;
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s, box-shadow 0.3s;
		text-decoration: none;
		color: inherit;
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

	h3 {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
		color: #333;
		font-weight: 600;
	}

	.price {
		font-size: 1.5rem;
		color: #0066cc;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.location {
		color: #666;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.features {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		color: #666;
		font-size: 0.875rem;
	}

	.features span {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
</style>
