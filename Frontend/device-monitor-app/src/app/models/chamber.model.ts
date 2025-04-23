/**
 * Enum representing possible chamber operational states
 * Must match the backend ChamberState enum
 */
export enum ChamberStatus {
    Offline = 'Offline',
    Idle = 'Idle',
    Running = 'Running',
    Error = 'Error',
    Maintenance = 'Maintenance',
}

/**
 * Interface representing a test chamber
 * Properties match the C# chamber class on the backend
 */
export interface Chamber {
    id?: number;            // Optional for new chambers (ID assigned by backend)
    name: string;           // Chamber display name
    type: string;           // Type of chamber (environmental, thermal, etc.)
    isActive: boolean;      // Is the chamber currently active
    lastMaintenance: Date;  // When was the last maintenance performed
    status: ChamberStatus;  // Current operational status
}