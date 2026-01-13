<script lang="ts">
import type { LayoutData } from './$types';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

let { data, children }: { data: LayoutData, children: any } = $props();

let isSidebarOpen = $state(true);

function toggleSidebar() {
isSidebarOpen = !isSidebarOpen;
}

async function handleLogout() {
await fetch('/api/logout', { method: 'POST' });
await goto('/');
}

const menuItems = [
{ icon: '📊', label: 'Dashboard', href: '/dashboard', gradient: 'from-blue-500 to-purple-500' },
{ icon: '🏠', label: 'Properties', href: '/dashboard/inventory', gradient: 'from-red-500 to-pink-500' },
{ icon: '👥', label: 'Clients', href: '/dashboard/leads', gradient: 'from-teal-500 to-cyan-500' },
{ icon: '📊', label: 'Reports', href: '/dashboard/reports', gradient: 'from-purple-500 to-indigo-500' },
{ icon: '⚙️', label: 'Settings', href: '/dashboard/admin', gradient: 'from-pink-500 to-rose-500' }
];

function isActive(href: string) {
return $page.url.pathname === href;
}
</script>

<div class="min-h-screen bg-gray-50 flex">
<aside class="fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 shadow-sm {isSidebarOpen ? 'w-64' : 'w-20'}">
<div class="h-16 flex items-center justify-center border-b border-gray-200">
<div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
</svg>
</div>
{#if isSidebarOpen}<span class="ml-3 text-xl font-bold text-gray-800">El Rowad</span>{/if}
</div>
<nav class="p-4 space-y-2">
{#each menuItems as item}
{@const active = isActive(item.href)}
<a href={item.href} class="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden {active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'}">
{#if active}<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r"></div>{/if}
<div class="w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-200 bg-gradient-to-br {item.gradient} group-hover:scale-110 {active ? 'opacity-100' : 'opacity-20'}">
<span>{item.icon}</span>
</div>
{#if isSidebarOpen}<span class="font-medium text-sm whitespace-nowrap">{item.label}</span>{/if}
</a>
{/each}
</nav>
<div class="absolute bottom-4 left-0 right-0 px-4">
<a href="/" target="_blank" class="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-all border-2 border-gray-200 hover:border-blue-300">
<div class="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-gradient-to-br from-blue-400 to-cyan-400 opacity-20"><span>🌐</span></div>
{#if isSidebarOpen}<span class="font-medium text-sm">Visit Website</span>{/if}
</a>
</div>
</aside>
<div class="flex-1 transition-all duration-300 {isSidebarOpen ? 'ml-64' : 'ml-20'}">
<header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
<button onclick={toggleSidebar} class="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors" aria-label="Toggle sidebar">
<svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
</button>
<div class="flex items-center gap-4">
<div class="flex items-center gap-3 bg-gray-50 rounded-full pl-4 pr-2 py-2">
<span class="text-sm font-medium text-gray-700">{data.user.username}</span>
<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
{data.user.username.substring(0, 2).toUpperCase()}
</div>
</div>
<button onclick={handleLogout} class="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium text-sm">Logout</button>
</div>
</header>
<main class="p-6">{@render children()}</main>
</div>
</div>
