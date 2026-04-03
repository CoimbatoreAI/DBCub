const API_URL = "http://localhost:5000/api";

export const api = {
    // Products
    getProducts: async () => {
        const res = await fetch(`${API_URL}/products`);
        return res.json();
    },
    getCategories: async () => {
        const res = await fetch(`${API_URL}/categories`);
        return res.json();
    },
    addCategory: async (data: FormData) => {
        const res = await fetch(`${API_URL}/categories`, {
            method: 'POST',
            body: data
        });
        return res.json();
    },
    updateCategory: async (id: string, data: FormData) => {
        const res = await fetch(`${API_URL}/categories/${id}`, {
            method: 'PUT',
            body: data
        });
        return res.json();
    },
    deleteCategory: async (id: string) => {
        const res = await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE' });
        return res.json();
    },
    addProduct: async (data: FormData) => {
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            body: data
        });
        return res.json();
    },
    updateProduct: async (id: string, data: FormData) => {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            body: data
        });
        return res.json();
    },
    deleteProduct: async (id: string) => {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        });
        return res.json();
    },

    // Auth
    login: async (credentials: any) => {
        const res = await fetch(`${API_URL}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });
        return res.json();
    },
    userLogin: async (credentials: any) => {
        const res = await fetch(`${API_URL}/admin/user-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });
        return res.json();
    },
    userRegister: async (userData: any) => {
        const res = await fetch(`${API_URL}/admin/user-register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        return res.json();
    },

    // Orders
    getOrders: async () => {
        const res = await fetch(`${API_URL}/orders`);
        return res.json();
    },
    updateOrderStatus: async (id: string, status: string, trackingId?: string) => {
        const res = await fetch(`${API_URL}/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, trackingId })
        });
        return res.json();
    },

    // Dashboard Stats
    getStats: async () => {
        const res = await fetch(`${API_URL}/admin/stats`);
        return res.json();
    },
    getUsers: async () => {
        const res = await fetch(`${API_URL}/admin/users`);
        return res.json();
    },
    trackOrder: async (trackingId: string) => {
        const res = await fetch(`${API_URL}/orders/track/${trackingId}`);
        return res.json();
    }
};
