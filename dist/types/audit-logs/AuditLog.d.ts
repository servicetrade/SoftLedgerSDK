export type AuditLog = {
    _id: string;
    tenantId: string;
    date: string;
    object: any;
    objectType: string;
    objectId: string;
    message: string;
    user: string;
    api: string;
    createdAt: string;
    updatedAt: string;
    userType: string;
    userLabel: string;
};