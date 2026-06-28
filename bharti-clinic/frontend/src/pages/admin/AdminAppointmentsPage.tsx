import { useState, useEffect } from 'react';
import { Eye, Trash2, Loader, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import api from '../../lib/axios';
import { TableSkeleton } from '../../components/ui/LoadingSkeleton';

// Types
interface Therapy {
    id: string;
    name: string;
    slug: string;
    description: string;
    durationMinutes: number;
    basePrice: number;
    discountedPrice?: number;
    discountExpiry?: string;
    isActive: boolean;
    isFeatured: boolean;
    categoryId: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

interface Appointment {
    id: string;
    patientName: string;
    phone: string;
    email: string;
    therapy: string | Therapy;
    preferredDate: string;
    preferredTime: string;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}

export function AdminAppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, [page, search, statusFilter]);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/admin/appointments', {
                params: {
                    page,
                    limit: 15,
                    search: search || undefined,
                    status: statusFilter || undefined,
                },
            });

            // API returns { success, data: { appointments, pagination }, message }
            const responseData = response.data.data || response.data;
            setAppointments(responseData.appointments);
            setTotalPages(responseData.pagination.totalPages);
        } catch (err) {
            setError('Failed to fetch appointments');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
        try {
            await api.patch(`/api/admin/appointments/${appointmentId}/status`, { status: newStatus });

            setSuccess('Appointment status updated successfully');
            fetchAppointments();
            setSelectedAppointment(null);
        } catch (err) {
            setError('Failed to update appointment status');
        }
    };

    const deleteAppointment = async (appointmentId: string) => {
        if (!confirm('Are you sure you want to delete this appointment?')) return;

        try {
            await api.delete(`/api/admin/appointments/${appointmentId}`);

            setSuccess('Appointment deleted successfully');
            fetchAppointments();
            setSelectedAppointment(null);
        } catch (err) {
            setError('Failed to delete appointment');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Appointments Management</h1>
                <p className="text-gray-600 mt-1">Track and manage therapy appointments</p>
            </div>

            {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                    {success}
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                    {error}
                </div>
            )}

            {selectedAppointment && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Appointment Details</h2>
                        <button
                            onClick={() => setSelectedAppointment(null)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                        >
                            Close
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <p className="text-sm text-gray-600">Appointment ID</p>
                            <p className="text-lg font-semibold text-gray-900">{selectedAppointment.id.slice(0, 8)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Date & Time</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {new Date(selectedAppointment.preferredDate).toLocaleDateString('en-IN')} at {selectedAppointment.preferredTime}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Patient Name</p>
                            <p className="text-lg font-semibold text-gray-900">{selectedAppointment.patientName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="text-lg font-semibold text-gray-900">{selectedAppointment.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="text-lg font-semibold text-gray-900">{selectedAppointment.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Therapy</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {typeof selectedAppointment.therapy === 'string'
                                    ? selectedAppointment.therapy
                                    : selectedAppointment.therapy?.name || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-3">Update Status</p>
                        <div className="flex gap-2">
                            {['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => updateAppointmentStatus(selectedAppointment.id, status)}
                                    className={`px-4 py-2 rounded-lg transition ${selectedAppointment.status === status
                                            ? 'bg-lotus-pink text-white'
                                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => deleteAppointment(selectedAppointment.id)}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Delete Appointment
                    </button>
                </div>
            )}

            {!selectedAppointment && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 flex gap-2">
                            <input
                                type="text"
                                placeholder="Search appointments by patient name or phone..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            >
                                <option value="">All Statuses</option>
                                <option value="PENDING">Pending</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Patient</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Therapy</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date & Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="p-0">
                                            <TableSkeleton rows={10} columns={5} />
                                        </td>
                                    </tr>
                                ) : appointments.length > 0 ? (
                                    appointments.map((appointment) => (
                                        <tr key={appointment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{appointment.patientName}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {typeof appointment.therapy === 'string' ? appointment.therapy : appointment.therapy?.name || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(appointment.preferredDate).toLocaleDateString('en-IN')} {appointment.preferredTime}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${appointment.status === 'PENDING'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : appointment.status === 'CONFIRMED'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : appointment.status === 'COMPLETED'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {appointment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedAppointment(appointment)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            No appointments found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setPage(Math.min(totalPages, page + 1))}
                                disabled={page === totalPages}
                                className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
