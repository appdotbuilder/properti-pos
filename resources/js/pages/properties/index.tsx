import React from 'react';
import AppLayout from '@/components/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Property {
    id: number;
    unit_number: string;
    type: string;
    price: number;
    status: string;
    bedrooms: number;
    bathrooms: number;
    building_area: number;
    project: {
        name: string;
    };
}

interface Props {
    properties: {
        data: Property[];
        links: Record<string, unknown>;
        meta: Record<string, unknown>;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Properti', href: '/properties' },
];

const typeLabels: { [key: string]: string } = {
    'rumah': 'Rumah',
    'apartment': 'Apartment',
    'ruko': 'Ruko',
    'kavling': 'Kavling',
    'villa': 'Villa'
};

const statusLabels: { [key: string]: string } = {
    'available': 'Tersedia',
    'reserved': 'Dipesan',
    'sold': 'Terjual',
    'maintenance': 'Maintenance'
};

const statusColors: { [key: string]: string } = {
    'available': 'bg-green-100 text-green-800',
    'reserved': 'bg-yellow-100 text-yellow-800',
    'sold': 'bg-red-100 text-red-800',
    'maintenance': 'bg-gray-100 text-gray-800'
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export default function PropertyIndex({ properties }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Properti" />
            
            <div className="p-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            🏠 Daftar Properti
                        </h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            Kelola unit properti Anda
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            href={route('properties.create')}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Tambah Properti
                        </Link>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {properties.data.map((property) => (
                        <div key={property.id} className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {property.project.name}
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Unit {property.unit_number}
                                        </p>
                                    </div>
                                    <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusColors[property.status]}`}>
                                        {statusLabels[property.status]}
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {typeLabels[property.type]} • {property.building_area}m²
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {property.bedrooms} KT • {property.bathrooms} KM
                                    </p>
                                    <p className="mt-2 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                        {formatCurrency(property.price)}
                                    </p>
                                </div>
                                
                                <div className="mt-6 flex justify-between">
                                    <Link
                                        href={route('properties.show', property.id)}
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                    >
                                        Lihat Detail
                                    </Link>
                                    <Link
                                        href={route('properties.edit', property.id)}
                                        className="text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {properties.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🏠</div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Belum ada properti</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Mulai dengan menambahkan unit properti pertama Anda.
                        </p>
                        <div className="mt-6">
                            <Link
                                href={route('properties.create')}
                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Tambah Properti
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}