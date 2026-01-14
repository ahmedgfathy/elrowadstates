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

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
<aside class="fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 transition-all duration-300 z-50 shadow-2xl {isSidebarOpen ? 'w-72' : 'w-20'}">
<div class="h-20 flex items-center {isSidebarOpen ? 'justify-start px-6' : 'justify-center'} border-b border-slate-700/50 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
<div class="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-6 transition-all duration-300">
<svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
</svg>
</div>
{#if isSidebarOpen}<span class="ml-4 text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">El Rowad</span>{/if}
</div>
<nav class="p-4 space-y-3 mt-2">
{#each menuItems as item}
{@const active = isActive(item.href)}
<a href={item.href} class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden {active ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50' : 'hover:bg-slate-700/50 text-gray-300'}">
{#if active}
<div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl"></div>
<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r shadow-lg"></div>
{/if}
<div class="w-11 h-11 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 {active ? 'bg-white/20 scale-110 shadow-lg' : 'bg-slate-700/30'} group-hover:scale-110 relative z-10">
<span class="{active ? 'drop-shadow-lg' : ''}">{item.icon}</span>
</div>
{#if isSidebarOpen}<span class="font-semibold text-base whitespace-nowrap relative z-10 {active ? 'text-white' : 'text-gray-300'}">{item.label}</span>{/if}
</a>
{/each}
</nav>
<div class="absolute bottom-6 left-0 right-0 px-4">
<a href="/" target="_blank" class="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-slate-700/30 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 text-gray-300 hover:text-white transition-all duration-300 border border-slate-600/50 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/30 group">
<div class="w-11 h-11 rounded-xl flex items-center justify-center text-2xl bg-slate-700/50 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
<span>🌐</span>
</div>
{#if isSidebarOpen}<span class="font-semibold text-base">Visit Website</span>{/if}
</a>
</div>
</aside>
<div class="flex-1 transition-all duration-300 {isSidebarOpen ? 'ml-72' : 'ml-20'}">
<header class="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
<button onclick={toggleSidebar} class="w-12 h-12 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 flex items-center justify-center transition-all duration-300 group" aria-label="Toggle sidebar">
<svg class="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
</button>
<div class="flex items-center gap-4">
<div class="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl pl-5 pr-2 py-2.5 border border-blue-100">
<span class="text-sm font-semibold text-gray-800">{data.user.username}</span>
<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
{data.user.username.substring(0, 2).toUpperCase()}
</div>
</div>
<button onclick={handleLogout} class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105">Logout</button>
</div>
</header>
<main class="p-8">{@render children()}</main>
</div>
</div>
