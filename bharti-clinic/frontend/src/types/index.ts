export interface Category {
    id: string;
    name: string;
    slug: string;
    type?: string;
    imageUrl?: string;
}

export interface Therapy {
    id: string;
    name: string;
    slug: string;
    description: string;
    durationMinutes: number;
    basePrice: number;
    discountedPrice?: number;
    imageUrl?: string;
    category: Category;
    benefits?: string[];
}

export interface Package {
    id: string;
    name: string;
    slug: string;
    description: string;
    totalPrice: number;
    originalPrice: number;
    validFrom?: string;
    validTo?: string;
    couponCode?: string;
    isActive: boolean;
    therapies: Therapy[];
    slotsAvailable?: number;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    sku?: string;
    description: string;
    ingredients?: string;
    howToUse?: string;
    price: number;
    comparePrice?: number;
    stock: number;
    categoryId: string;
    category: Category;
    imageUrls: string[];
    isActive: boolean;
    isFeatured: boolean;
    avgRating: number;
    reviewCount: number;
    createdAt: string;
}

export interface Review {
    id: string;
    productId: string;
    patientName: string;
    rating: number;
    comment: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    product?: { name: string; slug: string };
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface PaginatedResponse<T> {
    products: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface Address {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pinCode: string;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';

export interface Order {
    id: string;
    patientName: string;
    phone: string;
    email: string;
    status: OrderStatus;
    items: any[];
    totalAmount: number;
    shippingAddress: Address;
    paymentMethod: string;
    paymentStatus: PaymentStatus;
    createdAt: string;
    updatedAt: string;
}

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'SUPER_ADMIN';
    avatar?: string;
    createdAt: string;
}

export interface AdminLoginRequest {
    email: string;
    password: string;
}

export interface AdminLoginResponse {
    token: string;
    user: AdminUser;
}

export interface DashboardKPI {
    revenueToday: number;
    pendingOrders: number;
    appointmentsToday: number;
    lowStockAlerts: number;
}

export interface RevenueData {
    date: string;
    revenue: number;
}

export interface OrderStatusData {
    name: string;
    value: number;
}

export interface Appointment {
    id: string;
    patientName: string;
    therapy: string;
    dateTime: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

export interface LowStockAlert {
    productId: string;
    productName: string;
    currentStock: number;
    threshold: number;
}
