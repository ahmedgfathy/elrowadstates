<script lang="ts">
	let showImportModal = false;
	let csvFile: File | null = null;
	let csvHeaders: string[] = [];
	let csvData: any[] = [];
	let headerMapping: Record<string, string> = {};
	let importStatus = '';
	let importing = false;

	const propertyFields = [
		{ key: 'title', label: 'Title', required: false },
		{ key: 'description', label: 'Description', required: false },
		{ key: 'price', label: 'Price', required: false },
		{ key: 'type', label: 'Type (sell/rent)', required: false },
		{ key: 'category', label: 'Category', required: false },
		{ key: 'region', label: 'Region', required: false },
		{ key: 'bedrooms', label: 'Bedrooms', required: false },
		{ key: 'bathrooms', label: 'Bathrooms', required: false },
		{ key: 'area', label: 'Area (m²)', required: false },
		{ key: 'address', label: 'Address', required: false },
		{ key: 'images', label: 'Images (comma-separated URLs)', required: false },
		{ key: 'featured', label: 'Featured (true/false)', required: false },
		{ key: 'status', label: 'Status (active/sold/rented)', required: false }
	];

	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file && file.type === 'text/csv') {
			csvFile = file;
			parseCSV(file);
		} else {
			importStatus = 'Please select a valid CSV file';
		}
	}

	function parseCSV(file: File) {
		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target?.result as string;
			const lines = text.split('\n').filter((line) => line.trim());

			if (lines.length < 2) {
				importStatus = 'CSV file must have headers and at least one data row';
				return;
			}

			csvHeaders = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
			csvData = lines.slice(1).map((line) => {
				const values = line.split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
				const row: any = {};
				csvHeaders.forEach((header, index) => {
					row[header] = values[index] || '';
				});
				return row;
			});

			console.log('Parsed CSV headers:', csvHeaders);
			console.log('Parsed CSV data sample:', csvData[0]);
			console.log('Total rows:', csvData.length);

			// Auto-map headers if they match
			csvHeaders.forEach((header) => {
				const lowerHeader = header.toLowerCase();
				const matchedField = propertyFields.find(
					(f) => f.key.toLowerCase() === lowerHeader || f.label.toLowerCase().includes(lowerHeader)
				);
				if (matchedField) {
					headerMapping[header] = matchedField.key;
				}
			});

			console.log('Auto-mapped headers:', headerMapping);
			importStatus = `Found ${csvHeaders.length} columns and ${csvData.length} rows`;
		};
		reader.readAsText(file);
	}

	async function handleImport() {
		if (csvData.length === 0) {
			importStatus = 'No data to import';
			return;
		}

		// Skip required field validation - allow import with any mapped fields

		importing = true;
		importStatus = 'Importing properties...';

		try {
			const properties = csvData.map((row) => {
				const property: any = {};
				Object.entries(headerMapping).forEach(([csvHeader, fieldKey]) => {
					if (fieldKey && row[csvHeader] !== undefined && row[csvHeader] !== '') {
						let value = row[csvHeader];

						// Type conversions
						if (['price', 'bedrooms', 'bathrooms', 'area'].includes(fieldKey)) {
							value = parseFloat(value) || 0;
						} else if (fieldKey === 'featured') {
							value = value.toLowerCase() === 'true';
						} else if (fieldKey === 'images') {
							value = value.split('|').map((url: string) => url.trim());
						}

						property[fieldKey] = value;
					}
				});

				// Set defaults for all properties
				property.title = property.title || 'Untitled Property';
				property.description = property.description || '';
				property.price = property.price || 0;
				property.type = property.type || 'sell';
				property.category = property.category || 'apartment';
				property.region = property.region || 'unknown';

				return property;
			});

			console.log('Importing properties:', properties);

			const response = await fetch('/api/properties/import', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ properties })
			});

			const result = await response.json();
			console.log('Import response:', result);

			if (response.ok) {
				importStatus = `Successfully imported ${result.count} properties!`;
				setTimeout(() => {
					showImportModal = false;
					csvFile = null;
					csvHeaders = [];
					csvData = [];
					headerMapping = {};
					importStatus = '';
					window.location.reload(); // Refresh to show new data
				}, 2000);
			} else {
				importStatus = `Error: ${result.error || 'Failed to import properties'}`;
				console.error('Import error:', result);
			}
		} catch (error) {
			console.error('Import exception:', error);
			importStatus = `Error: ${error instanceof Error ? error.message : 'Failed to import'}`;
		} finally {
			importing = false;
		}
	}

	function closeModal() {
		showImportModal = false;
		csvFile = null;
		csvHeaders = [];
		csvData = [];
		headerMapping = {};
		importStatus = '';
	}
</script>

<div class="admin-page">
	<div class="admin-header">
		<h1>Admin Settings</h1>
		<button class="import-btn" on:click={() => (showImportModal = true)}>
			<span class="icon">📥</span>
			Import Inventory
		</button>
	</div>

	<div class="admin-sections">
		<section class="admin-section">
			<h2>🖼️ Hero Slideshow Management</h2>
			<p>Manage homepage hero slides</p>
			<button class="action-btn">Manage Slides</button>
		</section>

		<section class="admin-section">
			<h2>⭐ Featured Properties</h2>
			<p>Mark properties as featured on homepage</p>
			<button class="action-btn">Manage Featured</button>
		</section>

		<section class="admin-section">
			<h2>👥 User Management</h2>
			<p>Manage admin users and permissions</p>
			<button class="action-btn">Manage Users</button>
		</section>

		<section class="admin-section">
			<h2>⚙️ Site Settings</h2>
			<p>Configure site-wide settings and preferences</p>
			<button class="action-btn">Configure</button>
		</section>

		<section class="admin-section">
			<h2>📧 Contact Information</h2>
			<p>Update agent contact details</p>
			<div class="contact-info">
				<p><strong>Primary Contact:</strong> 01002778090</p>
			</div>
		</section>
	</div>
</div>

{#if showImportModal}
	<div class="modal-overlay" role="button" tabindex="0" on:click={closeModal} on:keydown={(e) => e.key === 'Escape' && closeModal()}>
		<div class="modal" role="dialog" aria-modal="true" tabindex="-1" on:click|stopPropagation on:keydown|stopPropagation>
			<div class="modal-header">
				<h2>Import Properties from CSV</h2>
				<button class="close-btn" on:click={closeModal}>×</button>
			</div>

			<div class="modal-body">
				<div class="upload-section">
					<label for="csv-file" class="file-label">
						<span class="icon">📄</span>
						{csvFile ? csvFile.name : 'Choose CSV File'}
					</label>
					<input
						id="csv-file"
						type="file"
						accept=".csv"
						on:change={handleFileSelect}
						style="display: none;"
					/>
				</div>

				{#if csvHeaders.length > 0}
					<div class="mapping-section">
						<h3>Map CSV Columns to Property Fields</h3>
						<div class="mapping-grid">
							{#each csvHeaders as header}
								<div class="mapping-row">
									<div class="csv-header">{header}</div>
									<div class="arrow">→</div>
									<select bind:value={headerMapping[header]} class="field-select">
										<option value="">Skip this column</option>
										{#each propertyFields as field}
											<option value={field.key}>
												{field.label}
											</option>
										{/each}
									</select>
								</div>
							{/each}
						</div>

						<div class="preview">
							<h4>Preview ({csvData.length} rows)</h4>
							<p class="preview-note">First row sample:</p>
							{#if csvData[0]}
								<div class="preview-row">
									{#each Object.entries(csvData[0]) as [key, value]}
										<div class="preview-item">
											<strong>{key}:</strong> {value}
										</div>
									{/each}
								</div>
							{/if}
						</div>

						{#if importStatus}
							<div class="status" class:error={importStatus.includes('Error') || importStatus.includes('Missing')}>
								{importStatus}
							</div>
						{/if}

						<div class="modal-actions">
							<button class="cancel-btn" on:click={closeModal} disabled={importing}>
								Cancel
							</button>
							<button class="import-btn-primary" on:click={handleImport} disabled={importing}>
								{importing ? 'Importing...' : 'Import Properties'}
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.admin-page {
		max-width: 1200px;
	}

	.admin-header {
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

	.import-btn {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		padding: 0.875rem 1.5rem;
		border-radius: 10px;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
	}

	.import-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
	}

	.import-btn .icon {
		font-size: 1.2rem;
	}

	.admin-sections {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.admin-section {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.admin-section h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: #333;
	}

	.admin-section p {
		color: #666;
		margin-bottom: 1.5rem;
	}

	.action-btn {
		background: #0066cc;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s;
		width: 100%;
	}

	.action-btn:hover {
		background: #0052a3;
	}

	.contact-info {
		background: #f8f9fa;
		padding: 1rem;
		border-radius: 6px;
		margin-top: 1rem;
	}

	.contact-info p {
		margin: 0.5rem 0;
	}

	/* Modal Styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		backdrop-filter: blur(4px);
	}

	.modal {
		background: white;
		border-radius: 16px;
		max-width: 800px;
		width: 90%;
		max-height: 90vh;
		overflow-y: auto;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 2rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.5rem;
		color: #333;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 2rem;
		color: #999;
		cursor: pointer;
		padding: 0;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background 0.2s;
	}

	.close-btn:hover {
		background: #f3f4f6;
		color: #333;
	}

	.modal-body {
		padding: 2rem;
	}

	.upload-section {
		margin-bottom: 2rem;
	}

	.file-label {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 1rem 2rem;
		border-radius: 10px;
		cursor: pointer;
		font-weight: 600;
		transition: transform 0.2s, box-shadow 0.2s;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
	}

	.file-label:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
	}

	.file-label .icon {
		font-size: 1.5rem;
	}

	.mapping-section {
		margin-top: 2rem;
	}

	.mapping-section h3 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
		color: #333;
	}

	.mapping-grid {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	.mapping-row {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem;
		background: #f9fafb;
		border-radius: 8px;
	}

	.csv-header {
		font-weight: 600;
		color: #667eea;
		padding: 0.5rem;
		background: white;
		border-radius: 6px;
	}

	.arrow {
		color: #999;
		font-size: 1.25rem;
	}

	.field-select {
		padding: 0.5rem;
		border: 2px solid #e5e7eb;
		border-radius: 6px;
		font-size: 0.875rem;
		background: white;
		cursor: pointer;
		transition: border-color 0.2s;
	}

	.field-select:focus {
		outline: none;
		border-color: #667eea;
	}

	.preview {
		background: #f9fafb;
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 1.5rem;
	}

	.preview h4 {
		margin: 0 0 1rem 0;
		color: #333;
	}

	.preview-note {
		font-size: 0.875rem;
		color: #666;
		margin-bottom: 0.75rem;
	}

	.preview-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 0.75rem;
	}

	.preview-item {
		background: white;
		padding: 0.5rem;
		border-radius: 4px;
		font-size: 0.875rem;
		color: #666;
	}

	.preview-item strong {
		color: #333;
	}

	.status {
		padding: 1rem;
		border-radius: 8px;
		margin-bottom: 1rem;
		background: #d1fae5;
		color: #065f46;
		font-weight: 500;
	}

	.status.error {
		background: #fee2e2;
		color: #991b1b;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	.cancel-btn {
		background: #f3f4f6;
		color: #374151;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.cancel-btn:hover:not(:disabled) {
		background: #e5e7eb;
	}

	.cancel-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.import-btn-primary {
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
	}

	.import-btn-primary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
	}

	.import-btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.admin-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.admin-sections {
			grid-template-columns: 1fr;
		}

		.mapping-row {
			grid-template-columns: 1fr;
		}

		.arrow {
			display: none;
		}

		.modal {
			width: 95%;
		}

		.modal-body {
			padding: 1rem;
		}
	}
</style>
