<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Property;
use App\Models\Customer;
use App\Models\SalesTransaction;
use App\Models\Payment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create users with different roles
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@propertypos.com',
            'password' => Hash::make('password'),
            'role' => 'administrator',
            'phone' => '+62812-3456-7890',
        ]);

        $salesAgent = User::create([
            'name' => 'Sales Agent',
            'email' => 'sales@propertypos.com',
            'password' => Hash::make('password'),
            'role' => 'sales_agent',
            'phone' => '+62813-4567-8901',
        ]);

        $finance = User::create([
            'name' => 'Finance Staff',
            'email' => 'finance@propertypos.com',
            'password' => Hash::make('password'),
            'role' => 'finance',
            'phone' => '+62814-5678-9012',
        ]);

        // Create projects
        $project1 = Project::create([
            'name' => 'Green Valley Residence',
            'description' => 'Perumahan asri dengan konsep green living di kawasan strategis',
            'address' => 'Jl. Raya Bogor KM 25, Cibinong, Bogor',
            'developer' => 'PT. Green Valley Development',
            'status' => 'ongoing',
        ]);

        $project2 = Project::create([
            'name' => 'Sunrise Apartment',
            'description' => 'Apartemen modern dengan fasilitas lengkap di pusat kota',
            'address' => 'Jl. Sudirman No. 123, Jakarta Pusat',
            'developer' => 'PT. Sunrise Property',
            'status' => 'ongoing',
        ]);

        $project3 = Project::create([
            'name' => 'Golden Villa Estate',
            'description' => 'Villa eksklusif dengan view pegunungan',
            'address' => 'Kawasan Puncak, Bogor',
            'developer' => 'PT. Golden Estate',
            'status' => 'planning',
        ]);

        // Create properties for Green Valley Residence
        for ($i = 1; $i <= 20; $i++) {
            Property::create([
                'project_id' => $project1->id,
                'unit_number' => sprintf('GV-%03d', $i),
                'type' => 'rumah',
                'land_area' => random_int(120, 200),
                'building_area' => random_int(80, 150),
                'price' => random_int(500000000, 800000000),
                'bedrooms' => random_int(2, 4),
                'bathrooms' => random_int(1, 3),
                'floors' => random_int(1, 2),
                'status' => $i <= 12 ? 'available' : ($i <= 17 ? 'sold' : 'reserved'),
                'description' => 'Rumah dengan desain modern dan lingkungan asri',
                'facilities' => 'Carport, Taman, Security 24 jam, Playground',
            ]);
        }

        // Create properties for Sunrise Apartment
        for ($i = 1; $i <= 50; $i++) {
            Property::create([
                'project_id' => $project2->id,
                'unit_number' => sprintf('SA-%03d', $i),
                'type' => 'apartment',
                'building_area' => random_int(35, 75),
                'price' => random_int(350000000, 650000000),
                'bedrooms' => random_int(1, 3),
                'bathrooms' => random_int(1, 2),
                'floors' => 1,
                'status' => $i <= 35 ? 'available' : ($i <= 45 ? 'sold' : 'reserved'),
                'description' => 'Unit apartemen dengan view kota dan fasilitas lengkap',
                'facilities' => 'Swimming pool, Gym, Mall access, Parking',
            ]);
        }

        // Create properties for Golden Villa Estate
        for ($i = 1; $i <= 10; $i++) {
            Property::create([
                'project_id' => $project3->id,
                'unit_number' => sprintf('GVE-%02d', $i),
                'type' => 'villa',
                'land_area' => random_int(300, 500),
                'building_area' => random_int(200, 350),
                'price' => random_int(1200000000, 2000000000),
                'bedrooms' => random_int(3, 5),
                'bathrooms' => random_int(2, 4),
                'floors' => random_int(1, 2),
                'status' => 'available',
                'description' => 'Villa mewah dengan pemandangan pegunungan',
                'facilities' => 'Private pool, Garden, Mountain view, Security',
            ]);
        }

        // Create customers
        $customers = [
            [
                'name' => 'Budi Santoso',
                'email' => 'budi.santoso@email.com',
                'phone' => '+62815-1234-5678',
                'identity_number' => '1234567890123456',
                'address' => 'Jl. Kemanggisan Raya No. 45, Jakarta Barat',
                'occupation' => 'Karyawan Swasta',
                'monthly_income' => 15000000,
                'marital_status' => 'married',
                'birth_date' => '1985-05-15',
                'emergency_contact_name' => 'Siti Santoso',
                'emergency_contact_phone' => '+62816-2345-6789',
                'status' => 'active',
            ],
            [
                'name' => 'Sari Dewi',
                'email' => 'sari.dewi@email.com',
                'phone' => '+62817-3456-7890',
                'identity_number' => '1234567890123457',
                'address' => 'Jl. Margonda Raya No. 78, Depok',
                'occupation' => 'Guru',
                'monthly_income' => 8000000,
                'marital_status' => 'single',
                'birth_date' => '1990-08-22',
                'emergency_contact_name' => 'Ahmad Dewi',
                'emergency_contact_phone' => '+62818-4567-8901',
                'status' => 'active',
            ],
            [
                'name' => 'Rizki Pratama',
                'email' => 'rizki.pratama@email.com',
                'phone' => '+62819-5678-9012',
                'identity_number' => '1234567890123458',
                'address' => 'Jl. BSD Raya No. 12, Tangerang Selatan',
                'occupation' => 'Pengusaha',
                'monthly_income' => 25000000,
                'marital_status' => 'married',
                'birth_date' => '1982-12-10',
                'emergency_contact_name' => 'Maya Pratama',
                'emergency_contact_phone' => '+62820-6789-0123',
                'status' => 'active',
            ],
            [
                'name' => 'Lina Wijaya',
                'email' => 'lina.wijaya@email.com',
                'phone' => '+62821-7890-1234',
                'identity_number' => '1234567890123459',
                'address' => 'Jl. Pajajaran No. 89, Bogor',
                'occupation' => 'Dokter',
                'monthly_income' => 20000000,
                'marital_status' => 'married',
                'birth_date' => '1988-03-18',
                'emergency_contact_name' => 'Dodi Wijaya',
                'emergency_contact_phone' => '+62822-8901-2345',
                'status' => 'active',
            ],
            [
                'name' => 'Andi Kurniawan',
                'email' => 'andi.kurniawan@email.com',
                'phone' => '+62823-9012-3456',
                'identity_number' => '1234567890123460',
                'address' => 'Jl. Raya Serpong No. 56, Tangerang',
                'occupation' => 'IT Manager',
                'monthly_income' => 18000000,
                'marital_status' => 'single',
                'birth_date' => '1992-07-25',
                'emergency_contact_name' => 'Nina Kurniawan',
                'emergency_contact_phone' => '+62824-0123-4567',
                'status' => 'active',
            ],
        ];

        foreach ($customers as $customerData) {
            Customer::create($customerData);
        }

        // Create sample transactions
        $soldProperties = Property::where('status', 'sold')->take(5)->get();
        $customers = Customer::all();

        foreach ($soldProperties as $index => $property) {
            $customer = $customers[$index % $customers->count()];
            $totalPrice = $property->price;
            $downPayment = $totalPrice * 0.2; // 20% DP
            $remainingBalance = $totalPrice - $downPayment;
            $dpInstallments = random_int(1, 6); // 1-6 bulan cicilan DP
            $creditInstallments = random_int(60, 96); // 5-8 tahun cicilan
            $dpMonthly = $dpInstallments > 1 ? $downPayment / $dpInstallments : $downPayment;
            $creditMonthly = $remainingBalance / $creditInstallments;

            $transaction = SalesTransaction::create([
                'transaction_code' => 'TXN' . now()->format('Ymd') . sprintf('%04d', $index + 1),
                'property_id' => $property->id,
                'customer_id' => $customer->id,
                'sales_agent_id' => $salesAgent->id,
                'transaction_date' => now()->subDays(random_int(30, 180)),
                'total_price' => $totalPrice,
                'down_payment' => $downPayment,
                'dp_installments' => $dpInstallments,
                'dp_monthly' => $dpMonthly,
                'remaining_balance' => $remainingBalance,
                'credit_installments' => $creditInstallments,
                'credit_monthly' => $creditMonthly,
                'interest_rate' => 6.5,
                'status' => 'active',
                'notes' => 'Transaksi sample untuk keperluan demo',
            ]);

            // Generate payment schedule for each transaction
            $baseDate = now()->subDays(random_int(30, 180));

            // Generate DP payment schedule
            for ($i = 1; $i <= $dpInstallments; $i++) {
                $dueDate = $baseDate->copy()->addMonths($i - 1);
                $status = $dueDate < now()->subDays(7) ? 'paid' : 'pending';

                Payment::create([
                    'payment_code' => 'PAY' . now()->format('Ymd') . sprintf('%04d', ($index * 20) + $i),
                    'sales_transaction_id' => $transaction->id,
                    'payment_type' => 'dp',
                    'installment_number' => $i,
                    'due_date' => $dueDate->format('Y-m-d'),
                    'payment_date' => $status === 'paid' ? $dueDate->format('Y-m-d') : null,
                    'amount_due' => $dpMonthly,
                    'amount_paid' => $status === 'paid' ? $dpMonthly : 0,
                    'status' => $status,
                    'payment_method' => $status === 'paid' ? 'transfer' : null,
                    'processed_by' => $status === 'paid' ? $finance->id : null,
                ]);
            }

            // Generate credit payment schedule
            $creditStartMonth = $dpInstallments;
            for ($i = 1; $i <= min(12, $creditInstallments); $i++) { // Only create first 12 credit payments
                $dueDate = $baseDate->copy()->addMonths($creditStartMonth + $i - 1);
                $status = $dueDate < now()->subDays(15) ? 'paid' : 'pending';

                Payment::create([
                    'payment_code' => 'PAY' . now()->format('Ymd') . sprintf('%04d', ($index * 20) + $dpInstallments + $i),
                    'sales_transaction_id' => $transaction->id,
                    'payment_type' => 'credit',
                    'installment_number' => $i,
                    'due_date' => $dueDate->format('Y-m-d'),
                    'payment_date' => $status === 'paid' ? $dueDate->format('Y-m-d') : null,
                    'amount_due' => $creditMonthly,
                    'amount_paid' => $status === 'paid' ? $creditMonthly : 0,
                    'status' => $status,
                    'payment_method' => $status === 'paid' ? 'transfer' : null,
                    'processed_by' => $status === 'paid' ? $finance->id : null,
                ]);
            }
        }
    }
}