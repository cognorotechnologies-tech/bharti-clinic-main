import { Response } from 'express';

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    message: string;
    pagination?: PaginationMeta;
}

export function sendSuccess<T>(
    res: Response,
    data: T,
    message = 'OK',
    pagination?: PaginationMeta
) {
    const body: ApiResponse<T> = {
        success: true,
        data,
        message,
        ...(pagination ? { pagination } : {}),
    };
    return res.json(body);
}

export function sendCreated<T>(res: Response, data: T, message = 'Created') {
    const body: ApiResponse<T> = {
        success: true,
        data,
        message,
    };
    return res.status(201).json(body);
}

export function sendError(
    res: Response,
    status: number,
    message: string,
    data?: unknown
) {
    const body: ApiResponse<unknown> = {
        success: false,
        data: data ?? null,
        message,
    };
    return res.status(status).json(body);
}

