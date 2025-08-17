import React from 'react';
import AppLayout from '@/components/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Project {
    id: number;
    name: string;
    description: string;
    address: string;
    developer: string;
    status: string;
    properties_count: number;
    created_at: string;
}

interface Props {
    projects: {
        data: Project[];
        links: Record<string, unknown>;
        meta: Record<string, unknown>;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Proyek', href: '/projects' },
];

const statusLabels: { [key: string]: string } = {
    'planning': 'Perencanaan',
    'ongoing': 'Berjalan',
    'completed': 'Selesai'
};

const statusColors: { [key: string]: string } = {
    'planning': 'bg-yellow-100 text-yellow-800',
    'ongoing': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800'
};

export default function ProjectIndex({ projects }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Proyek" />
            
            <div className="p-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            🏗️ Daftar Proyek
                        </h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            Kelola proyek properti Anda
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            href={route('projects.create')}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Tambah Proyek
                        </Link>
                    </div>
                </div>

                <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Nama Proyek
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Developer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                    Jumlah Unit
                                </th>
                                <th className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-800 dark:divide-gray-700">
                            {projects.data.map((project) => (
                                <tr key={project.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {project.name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {project.address}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                        {project.developer || '-'}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[project.status]}`}>
                                            {statusLabels[project.status]}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                        {project.properties_count} unit
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <Link
                                            href={route('projects.show', project.id)}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                                        >
                                            Lihat
                                        </Link>
                                        <Link
                                            href={route('projects.edit', project.id)}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {projects.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🏗️</div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Belum ada proyek</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Mulai dengan menambahkan proyek properti pertama Anda.
                        </p>
                        <div className="mt-6">
                            <Link
                                href={route('projects.create')}
                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Tambah Proyek
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}