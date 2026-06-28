import { useState, useEffect } from 'react';
import { Save, Loader } from 'lucide-react';
import api from '../../lib/axios';

export function AdminSettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({
        clinicName: 'Bharti Clinic',
        clinicEmail: 'contact@bharticlinic.com',
        clinicPhone: '+91 98765 43210',
        clinicAddress: 'Address coming soon',
        businessHours: 'Mon-Sun: 9 AM - 6 PM',
        currency: 'INR',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (key: string, value: string) => {
        setSettings({ ...settings, [key]: value });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await api.put('/api/settings', settings);
            setSuccess('Settings saved successfully');
        } catch (err) {
            setError('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Clinic Settings</h1>
                <p className="text-gray-600 mt-1">Manage clinic information and general settings</p>
            </div>

            {success && <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">{success}</div>}
            {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">{error}</div>}

            <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
                        <input
                            type="text"
                            value={settings.clinicName}
                            onChange={(e) => handleChange('clinicName', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={settings.clinicEmail}
                                onChange={(e) => handleChange('clinicEmail', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                            <input
                                type="tel"
                                value={settings.clinicPhone}
                                onChange={(e) => handleChange('clinicPhone', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <textarea
                            value={settings.clinicAddress}
                            onChange={(e) => handleChange('clinicAddress', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
                            <input
                                type="text"
                                value={settings.businessHours}
                                onChange={(e) => handleChange('businessHours', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                            <select
                                value={settings.currency}
                                onChange={(e) => handleChange('currency', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            >
                                <option value="INR">INR (₹)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="mt-8 flex items-center gap-2 px-6 py-2 bg-lotus-pink text-white rounded-lg hover:bg-pink-600 disabled:opacity-50"
                >
                    {loading ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
                    {loading ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}
