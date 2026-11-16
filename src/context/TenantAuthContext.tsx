'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CameraFeed {
  id: string;
  name: { en: string; es: string };
  location: string;
  channel: number;
  status: 'ONLINE' | 'STANDBY';
  resolution: string;
  fps: number;
  ipPlaceholder: string;
  sampleVideo: string;
}

export interface TenantInvoice {
  id: string;
  invoiceNumber: string;
  qboInvoiceId: string;
  amount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  paidAt?: string;
  paymentMethod?: string;
  receiptNumber?: string;
  breakdown: {
    baseRent: number;
    camFees: number;
    salesTax: number;
  };
}

export interface MaintenanceTicket {
  id: string;
  ticketCode: string;
  category: 'Plumbing' | 'Electrical' | 'HVAC' | 'Common' | 'Access';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  status: 'RECEIVED' | 'IN_REVIEW' | 'ASSIGNED' | 'RESOLVED';
  description: string;
  assignedTechnician?: string;
  contractorCompany?: string;
  createdAt: string;
  updatedAt: string;
  photoUrl?: string;
}

export interface BuildingAnnouncement {
  id: string;
  title: { en: string; es: string };
  category: 'ADVISORY' | 'MAINTENANCE' | 'COMMERCIAL' | 'EMERGENCY';
  date: string;
  body: { en: string; es: string };
  isPinned?: boolean;
}

export interface TenantProfile {
  id: string;
  accountCode: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  propertyId: number;
  propertyName: string;
  propertyAddress: string;
  suiteNumber: string;
  suiteType: string;
  areaSqft: number;
  monthlyRent: number;
  camFee: number;
  leaseStart: string;
  leaseEnd: string;
  securityDeposit: number;
  balance: number;
  nextDueDate: string;
  cameras: CameraFeed[];
}

export interface PaymentReceipt {
  receiptNumber: string;
  invoiceNumber: string;
  tenantName: string;
  companyName: string;
  suiteReference: string;
  amount: number;
  paymentMethod: string;
  timestamp: string;
  qboSyncStatus: string;
  authorizationCode: string;
}

interface TenantAuthContextType {
  tenant: TenantProfile | null;
  invoices: TenantInvoice[];
  tickets: MaintenanceTicket[];
  announcements: BuildingAnnouncement[];
  lastReceipt: PaymentReceipt | null;
  login: (accountOrEmail: string, pin?: string) => boolean;
  loginAsDemo: (accountCode: string) => void;
  logout: () => void;
  processPayment: (invoiceNumber: string, method: 'ACH' | 'CARD', paymentDetails?: Record<string, string>) => PaymentReceipt;
  createMaintenanceTicket: (ticket: {
    category: MaintenanceTicket['category'];
    priority: MaintenanceTicket['priority'];
    description: string;
    photoUrl?: string;
  }) => MaintenanceTicket;
  clearLastReceipt: () => void;
}

// Default Indianapolis Tenant Accounts
export const DEMO_TENANTS: TenantProfile[] = [
  {
    id: 'tenant-1042',
    accountCode: 'ACCT-1042',
    companyName: 'Circle City Tech Labs Inc.',
    contactName: 'Sarah Jenkins (VP of Infrastructure)',
    email: 'tech@circlecitylabs.com',
    phone: '(317) 555-0192',
    propertyId: 1,
    propertyName: '7898 Zionsville Rd Commercial Center',
    propertyAddress: '7898 Zionsville Rd, Indianapolis, IN 46268',
    suiteNumber: 'Suite 200',
    suiteType: 'Corporate Technology Office',
    areaSqft: 2400,
    monthlyRent: 3600.0,
    camFee: 320.0,
    leaseStart: '2024-03-01',
    leaseEnd: '2027-02-28',
    securityDeposit: 7200.0,
    balance: 3600.0,
    nextDueDate: '2027-02-01',
    cameras: [
      {
        id: 'cam-zionsville-01',
        name: {
          en: 'CAM 01 — Main Entrance & North Parking',
          es: 'CAM 01 — Acceso Principal y Estacionamiento Norte',
        },
        location: 'Building Exterior North Gate',
        channel: 1,
        status: 'ONLINE',
        resolution: '1080p Full HD',
        fps: 20,
        ipPlaceholder: '192.168.10.101',
        sampleVideo: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-cars-on-a-highway-42898-large.mp4',
      },
      {
        id: 'cam-zionsville-02',
        name: {
          en: 'CAM 02 — Freight Loading Dock & Service Bay',
          es: 'CAM 02 — Muelle de Carga y Bahía de Servicio',
        },
        location: 'Rear Loading Staging Area',
        channel: 2,
        status: 'ONLINE',
        resolution: '1080p Full HD',
        fps: 20,
        ipPlaceholder: '192.168.10.102',
        sampleVideo: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-42899-large.mp4',
      },
      {
        id: 'cam-zionsville-03',
        name: {
          en: 'CAM 03 — Perimeter West Fence & Gate Sensor',
          es: 'CAM 03 — Perímetro Oeste y Sensor de Portón',
        },
        location: 'West Fence Boundary',
        channel: 3,
        status: 'ONLINE',
        resolution: '1080p Full HD',
        fps: 20,
        ipPlaceholder: '192.168.10.103',
        sampleVideo: 'https://assets.mixkit.co/videos/preview/mixkit-highway-traffic-at-dusk-42901-large.mp4',
      },
      {
        id: 'cam-zionsville-04',
        name: {
          en: 'CAM 04 — Executive Courtyard & Lobby Approach',
          es: 'CAM 04 — Patio Ejecutivo y Acceso a Lobby',
        },
        location: 'Central Courtyard',
        channel: 4,
        status: 'ONLINE',
        resolution: '1080p Full HD',
        fps: 20,
        ipPlaceholder: '192.168.10.104',
        sampleVideo: 'https://assets.mixkit.co/videos/preview/mixkit-traffic-in-a-city-at-night-42900-large.mp4',
      },
    ],
  },
  {
    id: 'tenant-1043',
    accountCode: 'ACCT-1043',
    companyName: 'Midwest Logistics Partners LLC',
    contactName: 'Mark Kowalski (Distribution Director)',
    email: 'ops@midwestlogistics.com',
    phone: '(317) 555-0844',
    propertyId: 2,
    propertyName: 'Park 100 Industrial Center',
    propertyAddress: '5420 W 84th St (Park 100), Indianapolis, IN 46268',
    suiteNumber: 'Warehouse Bay 4-A',
    suiteType: 'Heavy Industrial Warehouse & Docks',
    areaSqft: 6800,
    monthlyRent: 8500.0,
    camFee: 650.0,
    leaseStart: '2023-08-01',
    leaseEnd: '2028-07-31',
    securityDeposit: 17000.0,
    balance: 8500.0,
    nextDueDate: '2027-02-05',
    cameras: [
      {
        id: 'cam-park100-01',
        name: {
          en: 'CAM 01 — Industrial Truck Court & Gate 1',
          es: 'CAM 01 — Patio de Maniobras y Portón 1',
        },
        location: 'Park 100 Gate 1 Entrance',
        channel: 1,
        status: 'ONLINE',
        resolution: '1080p Full HD',
        fps: 20,
        ipPlaceholder: '192.168.20.201',
        sampleVideo: 'https://assets.mixkit.co/videos/preview/mixkit-highway-traffic-at-dusk-42901-large.mp4',
      },
      {
        id: 'cam-park100-02',
        name: {
          en: 'CAM 02 — Loading Docks 1–4 High Clearance',
          es: 'CAM 02 — Muelles 1–4 Altura Libre',
        },
        location: 'Docks 1 to 4 Exterior Apron',
        channel: 2,
        status: 'ONLINE',
        resolution: '1080p Full HD',
        fps: 20,
        ipPlaceholder: '192.168.20.202',
        sampleVideo: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-cars-on-a-highway-42898-large.mp4',
      },
      {
        id: 'cam-park100-03',
        name: {
          en: 'CAM 03 — Fleet Overnight Staging Yard',
          es: 'CAM 03 — Patio Nocturno de Flotas',
        },
        location: 'North Staging Yard',
        channel: 3,
        status: 'ONLINE',
        resolution: '1080p Full HD',
        fps: 20,
        ipPlaceholder: '192.168.20.203',
        sampleVideo: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-42899-large.mp4',
      },
    ],
  },
  {
    id: 'tenant-1044',
    accountCode: 'ACCT-1044',
    companyName: 'Hoosier Supply Chain Corp',
    contactName: 'Elena Rostova (Fleet Manager)',
    email: 'dispatch@hoosiersupply.com',
    phone: '(317) 555-0312',
    propertyId: 3,
    propertyName: 'Morris Street Flex & Service Hub',
    propertyAddress: '2400 W Morris St, Indianapolis, IN 46221',
    suiteNumber: 'Flex Bay 12-B',
    suiteType: 'Drive-In Flex / Warehouse',
    areaSqft: 3200,
    monthlyRent: 4400.0,
    camFee: 380.0,
    leaseStart: '2024-01-01',
    leaseEnd: '2027-12-31',
    securityDeposit: 8800.0,
    balance: 0.0, // Reconciled
    nextDueDate: '2027-03-01',
    cameras: [
      {
        id: 'cam-morris-01',
        name: {
          en: 'CAM 01 — Drive-In Fleet Yard & I-70 Gate',
          es: 'CAM 01 — Patio de Flotas y Acceso a la I-70',
        },
        location: 'South Yard Gate',
        channel: 1,
        status: 'ONLINE',
        resolution: '1080p Full HD',
        fps: 20,
        ipPlaceholder: '192.168.30.301',
        sampleVideo: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-cars-on-a-highway-42898-large.mp4',
      },
      {
        id: 'cam-morris-02',
        name: {
          en: 'CAM 02 — West Loading Bay & Service Bays',
          es: 'CAM 02 — Bahía Oeste y Talleres de Servicio',
        },
        location: 'Service Hub Canopy',
        channel: 2,
        status: 'ONLINE',
        resolution: '1080p Full HD',
        fps: 20,
        ipPlaceholder: '192.168.30.302',
        sampleVideo: 'https://assets.mixkit.co/videos/preview/mixkit-traffic-in-a-city-at-night-42900-large.mp4',
      },
    ],
  },
  {
    id: 'tenant-1045',
    accountCode: 'ACCT-1045',
    companyName: 'Meridian Wellness Center',
    contactName: 'Dr. Gregory Vance',
    email: 'admin@meridianwellness.com',
    phone: '(317) 555-0919',
    propertyId: 4,
    propertyName: 'Meridian North Executive Suites',
    propertyAddress: '9245 N Meridian St, Indianapolis, IN 46260',
    suiteNumber: 'Suite 310',
    suiteType: 'Medical & Professional Suite',
    areaSqft: 1100,
    monthlyRent: 2850.0,
    camFee: 260.0,
    leaseStart: '2023-11-01',
    leaseEnd: '2026-10-31',
    securityDeposit: 5700.0,
    balance: 2850.0,
    nextDueDate: '2027-01-25', // Overdue
    cameras: [
      {
        id: 'cam-meridian-01',
        name: {
          en: 'CAM 01 — Executive Front Parking & Main Entrance',
          es: 'CAM 01 — Estacionamiento Frontal y Acceso Principal',
        },
        location: 'Meridian North Lobby Glass Entrance',
        channel: 1,
        status: 'ONLINE',
        resolution: '1080p Full HD',
        fps: 20,
        ipPlaceholder: '192.168.40.401',
        sampleVideo: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-42899-large.mp4',
      },
      {
        id: 'cam-meridian-02',
        name: {
          en: 'CAM 02 — South Covered Parking & Access Ramp',
          es: 'CAM 02 — Estacionamiento Techado y Rampa Sur',
        },
        location: 'South Parking Structure',
        channel: 2,
        status: 'ONLINE',
        resolution: '1080p Full HD',
        fps: 20,
        ipPlaceholder: '192.168.40.402',
        sampleVideo: 'https://assets.mixkit.co/videos/preview/mixkit-highway-traffic-at-dusk-42901-large.mp4',
      },
    ],
  },
];

const INITIAL_INVOICES: TenantInvoice[] = [
  {
    id: 'inv-1042-1',
    invoiceNumber: 'INV-2027-0891',
    qboInvoiceId: 'QBO-990142',
    amount: 3600.0,
    dueDate: '2027-02-01',
    status: 'PENDING',
    breakdown: {
      baseRent: 3280.0,
      camFees: 320.0,
      salesTax: 0.0,
    },
  },
  {
    id: 'inv-1042-0',
    invoiceNumber: 'INV-2027-0740',
    qboInvoiceId: 'QBO-981240',
    amount: 3600.0,
    dueDate: '2027-01-01',
    status: 'PAID',
    paidAt: '2027-01-02T10:14:00Z',
    paymentMethod: 'ACH Direct Transfer',
    receiptNumber: 'REC-10492',
    breakdown: {
      baseRent: 3280.0,
      camFees: 320.0,
      salesTax: 0.0,
    },
  },
  {
    id: 'inv-1042-prev',
    invoiceNumber: 'INV-2026-1188',
    qboInvoiceId: 'QBO-970321',
    amount: 3600.0,
    dueDate: '2026-12-01',
    status: 'PAID',
    paidAt: '2026-11-29T16:22:00Z',
    paymentMethod: 'Corporate ACH',
    receiptNumber: 'REC-09844',
    breakdown: {
      baseRent: 3280.0,
      camFees: 320.0,
      salesTax: 0.0,
    },
  },
];

const INITIAL_TICKETS: MaintenanceTicket[] = [
  {
    id: 'tck-1042',
    ticketCode: 'TCK-1042',
    category: 'Electrical',
    priority: 'LOW',
    status: 'IN_REVIEW',
    description: 'Conference room LED dimmer panel programming and circuit check.',
    assignedTechnician: 'Carlos Ramírez',
    contractorCompany: 'VoltCare Indy LLC',
    createdAt: '2027-01-14T09:30:00Z',
    updatedAt: '2027-01-14T11:00:00Z',
  },
  {
    id: 'tck-1039',
    ticketCode: 'TCK-1039',
    category: 'HVAC',
    priority: 'HIGH',
    status: 'RESOLVED',
    description: 'Zone B thermostat calibration and high-efficiency filter swap.',
    assignedTechnician: 'David Sun',
    contractorCompany: 'Indy Air Solutions',
    createdAt: '2026-12-10T14:15:00Z',
    updatedAt: '2026-12-11T16:45:00Z',
  },
];

const INITIAL_ANNOUNCEMENTS: BuildingAnnouncement[] = [
  {
    id: 'ann-1',
    title: {
      en: 'Winter Storm Heating & Snow Removal Schedule',
      es: 'Protocolo de Calefacción Invernal y Despeje de Nieve',
    },
    category: 'ADVISORY',
    date: '2027-01-15',
    isPinned: true,
    body: {
      en: 'The building management has scheduled continuous snow clearing for tenant parking bays and truck loading ramps starting at 05:00 AM. HVAC boilers are programmed for optimal baseline temperatures throughout the weekend.',
      es: 'La administración ha programado el despeje continuo de nieve en estacionamientos y rampas de carga a partir de las 05:00 AM. Los sistemas de calefacción operarán en régimen óptimo durante todo el fin de semana.',
    },
  },
  {
    id: 'ann-2',
    title: {
      en: 'Hikvision CCTV Infrastructure Upgrade Complete',
      es: 'Finalizada la Modernización de CCTV Hikvision',
    },
    category: 'COMMERCIAL',
    date: '2027-01-10',
    body: {
      en: 'All perimeter 1080p cameras and gate sensors have been upgraded with ultra-low latency Hik-Connect streaming. Tenants can now monitor parking and loading docks 24/7 directly via this portal.',
      es: 'Todas las cámaras perimetrales 1080p y sensores de portón fueron actualizados con streaming de ultrabaja latencia vía Hik-Connect. Ahora puede supervisar accesos y muelles 24/7 desde este portal.',
    },
  },
  {
    id: 'ann-3',
    title: {
      en: 'Annual Fire Sprinkler & Alarm Inspection',
      es: 'Inspección Anual de Rociadores y Alarma contra Incendios',
    },
    category: 'MAINTENANCE',
    date: '2027-01-05',
    body: {
      en: 'SafeKey Systems will conduct certified riser pressure tests on Tuesday between 09:00 AM and 11:30 AM. No audible sirens will be triggered.',
      es: 'SafeKey Systems realizará pruebas certificadas de presión en rociadores el martes entre las 09:00 AM y 11:30 AM. No se activarán sirenas sonoras.',
    },
  },
];

const TenantAuthContext = createContext<TenantAuthContextType | null>(null);

export function TenantAuthProvider({ children }: { children: ReactNode }) {
  // Default to Circle City Tech Labs or restore stored session lazily
  const [tenant, setTenant] = useState<TenantProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('hyco_client_tenant_id');
        if (stored) {
          const found = DEMO_TENANTS.find((t) => t.id === stored || t.accountCode === stored);
          if (found) return found;
        }
      } catch {
        // Fallback
      }
    }
    return DEMO_TENANTS[0];
  });

  const [invoices, setInvoices] = useState<TenantInvoice[]>(INITIAL_INVOICES);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_TICKETS);
  const [announcements] = useState<BuildingAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [lastReceipt, setLastReceipt] = useState<PaymentReceipt | null>(null);

  const login = (accountOrEmail: string): boolean => {
    const clean = accountOrEmail.trim().toLowerCase();
    const found = DEMO_TENANTS.find(
      (t) =>
        t.accountCode.toLowerCase() === clean ||
        t.email.toLowerCase() === clean ||
        t.companyName.toLowerCase().includes(clean)
    );

    if (found) {
      setTenant(found);
      try {
        localStorage.setItem('hyco_client_tenant_id', found.id);
      } catch {
        // Fallback
      }
      return true;
    }

    if (clean.length > 0) {
      const fallback = DEMO_TENANTS[0];
      setTenant({
        ...fallback,
        email: clean.includes('@') ? clean : fallback.email,
      });
      try {
        localStorage.setItem('hyco_client_tenant_id', fallback.id);
      } catch {
        // Fallback
      }
      return true;
    }

    return false;
  };

  const loginAsDemo = (accountCode: string) => {
    const found = DEMO_TENANTS.find((t) => t.accountCode === accountCode);
    if (found) {
      setTenant(found);
      try {
        localStorage.setItem('hyco_client_tenant_id', found.id);
      } catch {
        // Fallback
      }
    }
  };

  const logout = () => {
    setTenant(null);
    try {
      localStorage.removeItem('hyco_client_tenant_id');
    } catch {
      // Fallback
    }
  };

  const processPayment = (invoiceNumber: string, method: 'ACH' | 'CARD'): PaymentReceipt => {
    const targetInvoice = invoices.find((inv) => inv.invoiceNumber === invoiceNumber) || invoices[0];
    const receiptNum = `REC-${Math.floor(10000 + Math.random() * 90000)}`;
    const nowIso = new Date().toISOString();

    // Mark invoice as paid
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.invoiceNumber === targetInvoice.invoiceNumber
          ? {
              ...inv,
              status: 'PAID',
              paidAt: nowIso,
              paymentMethod: method === 'ACH' ? 'ACH Direct Bank Transfer' : 'Encrypted Credit/Debit Card',
              receiptNumber: receiptNum,
            }
          : inv
      )
    );

    // Update tenant balance to zero (reconciled)
    if (tenant) {
      setTenant({
        ...tenant,
        balance: 0.0,
      });
    }

    const receipt: PaymentReceipt = {
      receiptNumber: receiptNum,
      invoiceNumber: targetInvoice.invoiceNumber,
      tenantName: tenant?.contactName || 'Authorized Tenant',
      companyName: tenant?.companyName || 'Circle City Tech Labs Inc.',
      suiteReference: `${tenant?.suiteNumber} — ${tenant?.propertyName}`,
      amount: targetInvoice.amount,
      paymentMethod: method === 'ACH' ? 'ACH Corporate Wire / Bank Debit' : 'Visa / MasterCard Gateway',
      timestamp: nowIso,
      qboSyncStatus: 'SYNCHRONIZED (Payment entity created in QuickBooks Online)',
      authorizationCode: `AUTH-QBO-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setLastReceipt(receipt);
    return receipt;
  };

  const createMaintenanceTicket = (params: {
    category: MaintenanceTicket['category'];
    priority: MaintenanceTicket['priority'];
    description: string;
    photoUrl?: string;
  }): MaintenanceTicket => {
    const newCode = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const newTicket: MaintenanceTicket = {
      id: `tck-${Date.now()}`,
      ticketCode: newCode,
      category: params.category,
      priority: params.priority,
      status: 'RECEIVED',
      description: params.description,
      createdAt: now,
      updatedAt: now,
      photoUrl: params.photoUrl,
    };

    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const clearLastReceipt = () => {
    setLastReceipt(null);
  };

  return (
    <TenantAuthContext.Provider
      value={{
        tenant,
        invoices,
        tickets,
        announcements,
        lastReceipt,
        login,
        loginAsDemo,
        logout,
        processPayment,
        createMaintenanceTicket,
        clearLastReceipt,
      }}
    >
      {children}
    </TenantAuthContext.Provider>
  );
}

export function useTenantAuth() {
  const context = useContext(TenantAuthContext);
  if (!context) {
    throw new Error('useTenantAuth must be used within a TenantAuthProvider');
  }
  return context;
}
