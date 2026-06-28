import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';

function getPublicKeys(): string[] {
    const envKeys = process.env.PUBLIC_SETTING_KEYS;
    if (envKeys && envKeys.trim().length > 0) {
        return envKeys
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean);
    }
    return [
        'clinicName',
        'clinicPhone',
        'clinicEmail',
        'clinicAddress',
        'clinicHours',
        'upiId',
        'whatsappNumber',
    ];
}

function coerceSettingValue(type: string, raw: string) {
    if (type === 'BOOLEAN') return raw === 'true';
    if (type === 'JSON') {
        try {
            return JSON.parse(raw);
        } catch {
            return raw;
        }
    }
    return raw;
}

export const getPublicSettings = async (_req: Request, res: Response) => {
    try {
        const keys = getPublicKeys();

        const settings = await prisma.setting.findMany({
            where: { key: { in: keys } },
            select: { key: true, value: true, type: true },
        });

        const data = settings.reduce<Record<string, unknown>>((acc, s) => {
            acc[s.key] = coerceSettingValue(s.type, s.value);
            return acc;
        }, {});

        return sendSuccess(res, data, 'Public settings fetched successfully');
    } catch (error) {
        console.error('Error fetching public settings:', error);
        return sendError(res, 500, 'Failed to fetch public settings');
    }
};

