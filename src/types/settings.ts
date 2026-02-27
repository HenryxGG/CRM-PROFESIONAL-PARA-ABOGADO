/**
 * Schema configurations for Lawyer Account Settings
 * Separates strict system configurations (ADMIN_ROLE) from
 * personal user preferences (USER_ROLE).
 */

// --- ENUMS & SHARED TYPES ---

export type Role = 'ADMIN_ROLE' | 'USER_ROLE';
export type CurrencyISO = 'USD' | 'EUR' | 'COP' | 'MXN' | 'ARS'; // Extend as necessary
export type BillingType = 'HOURLY' | 'FLAT_FEE' | 'CONTINGENCY';
export type RetentionPolicy = 'SOFT_DELETE' | 'HARD_DELETE';
export type WebhookEvent = 'case.created' | 'case.won' | 'case.closed' | 'payment.received';
export type NotificationChannel = 'EMAIL' | 'IN_APP' | 'SMS';
export type MilestoneEvent = 'hearing_scheduled' | 'document_filed' | 'deadline_approaching';
export type TaskRoutingQueue = 'PERSONAL_CALENDAR' | 'SHARED_QUEUE';
export type ExternalCalendarProvider = 'GOOGLE' | 'MICROSOFT';

// --- ADMIN LEVEL SCHEMAS (System constraints, requires ADMIN_ROLE) ---

export interface AccessControlEntry {
    userId: string;
    userName: string;
    permissions: {
        read: boolean;
        write: boolean;
        export: boolean;
    };
}

export interface TaxRule {
    id: string;
    name: string;      // e.g., 'IVA', 'Retención en la Fuente'
    percentage: number;
    isActive: boolean;
}

export interface BillingSchemaOverride {
    type: BillingType;
    currency: CurrencyISO;
    baseRate?: number;       // For HOURLY or FLAT_FEE
    contingencyPct?: number; // For CONTINGENCY
    appliedTaxes: TaxRule[];
}

export interface WebhookConfig {
    id: string;
    url: string;
    event: WebhookEvent;
    secret: string;    // Used for payload signature verification
    isActive: boolean;
}

/**
 * Global Lawyer Account model.
 * Mutations to this entity affect all system users and billing.
 */
export interface LawyerAccount {
    id: string;
    organizationId: string;
    fullName: string;
    professionalId: string; // Matrícula o colegiatura
    billingConfig: BillingSchemaOverride;
    dataRetention: {
        policy: RetentionPolicy;
        ttlDays?: number; // Time-to-live if HARD_DELETE is selected
    };
    accessControlList: AccessControlEntry[];
    webhooks: WebhookConfig[];
    updatedAt: string;
    updatedBy: string; // UUID of ADMIN_ROLE mapping to the audit log
}

// --- USER LEVEL SCHEMAS (Client preferences, mutable by USER_ROLE) ---

export interface NotificationPreference {
    event: MilestoneEvent;
    channels: NotificationChannel[]; // Array of customized active channels
}

export interface ExternalSyncPreferences {
    enabled: boolean;
    provider?: ExternalCalendarProvider;
    syncIntervalHours?: number; // 1 | 4 | 24
}

/**
 * Isolated preferences entity per user per lawyer account.
 * Changes here do not impact system billing or global webhooks.
 */
export interface UserPreferences {
    userId: string;
    accountId: string;     // References LawyerAccount.id
    uiCustomization: {
        alias: string;       // Custom name user gives to this account view
        colorTag: string;    // HEX color for visual organization
    };
    notificationMatrix: NotificationPreference[];
    workflowAutoAssignment: TaskRoutingQueue;
    externalSync: ExternalSyncPreferences;
    createdAt: string;
    updatedAt: string;
}

// --- API PAYLOADS ---

/** Use this to export audit logs related to an account */
export interface AuditLogExportRequest {
    accountId: string;
    startDate: string; // ISO date
    endDate: string;   // ISO date
    format: 'JSON' | 'CSV';
}
