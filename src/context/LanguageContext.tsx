'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, startTransition } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav & General
    'app.title': 'HYCO Tenant Portal',
    'app.tagline': 'Commercial & Residential Tenant Self-Service PWA',
    'nav.overview': 'Overview',
    'nav.surveillance': 'CCTV & Security',
    'nav.billing': 'Billing & Payments',
    'nav.maintenance': 'Helpdesk & Maintenance',
    'nav.announcements': 'Announcements',
    'nav.showcase': 'Available Suites',
    'nav.lease': 'My Lease Agreement',
    'nav.logout': 'Sign Out',
    'common.live': 'LIVE',
    'common.refresh': 'Refresh',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.close': 'Close',
    'common.download': 'Download',
    'common.view': 'View',
    'common.search': 'Search...',
    'common.back': 'Back',
    'common.emergency': 'Emergency Security Contact',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.amount': 'Amount',
    'common.actions': 'Actions',

    // Login
    'login.title': 'HYCO Tenant Portal',
    'login.subtitle': 'Sign in to access rent payments, live CCTV, and 24/7 maintenance',
    'login.account_id': 'Tenant Account Code or Email',
    'login.account_placeholder': 'e.g. ACCT-1042 or tenant@domain.com',
    'login.password': 'Access PIN or Password',
    'login.password_placeholder': '••••••••',
    'login.submit': 'Access Tenant Portal',
    'login.quick_demo': 'Quick Demo Tenant Select',
    'login.quick_demo_desc': 'Select an active Indianapolis commercial tenant to preview live data:',
    'login.commercial_badge': 'COMMERCIAL',
    'login.industrial_badge': 'INDUSTRIAL',
    'login.help': 'Need assistance logging in? Contact property management at (317) 675-0041',

    // Overview
    'overview.welcome': 'Welcome back,',
    'overview.suite': 'Leased Suite',
    'overview.rent_due': 'Next Rent Due',
    'overview.balance': 'Current Balance',
    'overview.balance_paid': 'Balance Paid (Reconciled)',
    'overview.pay_now': 'Pay Rent Now',
    'overview.open_tickets': 'Active Maintenance',
    'overview.cctv_quick': 'Live Perimeter Cameras',
    'overview.cctv_quick_desc': 'Real-time Hikvision stream active',
    'overview.view_all_cams': 'Open Surveillance Grid',
    'overview.latest_announcement': 'Latest Building Notice',
    'overview.refer_friend': 'Refer a Business Partner',
    'overview.refer_desc': 'Share available HYCO suites and earn lease credits',

    // CCTV & Surveillance
    'cctv.title': 'Live Surveillance & Security Feeds',
    'cctv.subtitle': 'Real-time perimeter, parking and loading dock feeds powered by Hikvision & Hik-Connect',
    'cctv.hikvision_badge': 'Hikvision Cloud P2P Active',
    'cctv.stream_quality': '1080p Full HD • 20 FPS',
    'cctv.cam_select': 'Select Camera Channel',
    'cctv.cam_perimeter': 'Perimeter & Main Access',
    'cctv.cam_parking': 'North Visitor & Tenant Parking',
    'cctv.cam_dock': 'Truck Loading Bay & Freight Staging',
    'cctv.cam_lobby': 'Executive Lobby & Entryway',
    'cctv.night_vision': 'IR Night Vision',
    'cctv.night_vision_on': 'Night Vision ON',
    'cctv.night_vision_off': 'Day Mode',
    'cctv.snapshot': 'Capture Snapshot',
    'cctv.snapshot_saved': 'Snapshot downloaded with official timestamp',
    'cctv.fullscreen': 'Fullscreen View',
    'cctv.privacy_notice': 'Privacy Notice: Only authorized exterior zones and common areas for your leased building are streamed. Private suites are strictly confidential.',
    'cctv.emergency_dispatch': 'Call Indianapolis Security Dispatch (317) 675-0041',
    'cctv.integration_info': 'Hik-Connect OpenAPI Bridge',
    'cctv.integration_desc': 'Feeds securely relayed through tokenized HLS/WebRTC via Hik-Connect Cloud. Local NVR ports remain firewalled.',

    // Billing
    'billing.title': 'Billing & Rent Payments',
    'billing.subtitle': 'Automated invoicing synchronized bidirectionally with QuickBooks Online (QBO)',
    'billing.summary': 'Financial Ledger Summary',
    'billing.total_due': 'Total Outstanding',
    'billing.due_date': 'Due Date',
    'billing.monthly_rent': 'Base Monthly Rent',
    'billing.cam_fees': 'Common Area Maintenance (CAM)',
    'billing.payment_method': 'Preferred Payment Channel',
    'billing.pay_ach': 'ACH Direct Bank Transfer (Zero Fee)',
    'billing.pay_card': 'Credit / Debit Card (Immediate)',
    'billing.process_payment': 'Submit Rent Payment',
    'billing.payment_success': 'Payment Approved & Reconciled with QuickBooks Online!',
    'billing.receipt_number': 'Official Payment Reference',
    'billing.receipt_download': 'Download Official Digital Receipt (PDF)',
    'billing.invoices_history': 'Invoice & Payment History',
    'billing.status_paid': 'PAID & RECONCILED',
    'billing.status_pending': 'PENDING PAYMENT',
    'billing.status_overdue': 'PAST DUE',

    // Maintenance / Helpdesk
    'maintenance.title': 'Helpdesk & Maintenance Central',
    'maintenance.subtitle': 'Report building or suite issues with photos/videos and track progress 24/7',
    'maintenance.new_ticket': 'Open New Maintenance Ticket',
    'maintenance.category': 'Service Category',
    'maintenance.category_plumbing': 'Plumbing & Water',
    'maintenance.category_electrical': 'Electrical & Lighting',
    'maintenance.category_hvac': 'HVAC & Climate Control',
    'maintenance.category_common': 'Common Areas & Doors',
    'maintenance.category_access': 'Access Control & Locks',
    'maintenance.priority': 'Priority Level',
    'maintenance.priority_low': 'Low (Routine)',
    'maintenance.priority_medium': 'Medium (Standard 24h)',
    'maintenance.priority_high': 'High (Urgent 4h)',
    'maintenance.priority_emergency': 'Emergency (Immediate)',
    'maintenance.description': 'Detailed Issue Description',
    'maintenance.description_placeholder': 'Describe what happened, exact location inside suite or common area...',
    'maintenance.media_upload': 'Attach Photos or Video Tour',
    'maintenance.media_upload_desc': 'Drag & drop files or tap to take a photo. Automatically converted to WebP.',
    'maintenance.submit_ticket': 'Dispatch Ticket to Property Managers',
    'maintenance.step_received': 'Received',
    'maintenance.step_review': 'In Review',
    'maintenance.step_assigned': 'Contractor Assigned',
    'maintenance.step_resolved': 'Resolved & Certified',
    'maintenance.technician': 'Assigned Certified Contractor',
    'maintenance.active_tickets': 'Active Tickets',
    'maintenance.resolved_tickets': 'Past Work Orders',

    // Announcements
    'announcements.title': 'Official Building Notice Board',
    'announcements.subtitle': 'Direct communications, preventative maintenance schedules, and building advisories',
    'announcements.all': 'All Notices',
    'announcements.pinned': 'Priority Advisory',

    // Showcase & Referrals
    'showcase.title': 'Available HYCO Suites & Referral Engine',
    'showcase.subtitle': 'Explore prime commercial and industrial spaces across Indianapolis and refer colleagues',
    'showcase.share_suite': 'Share Suite (Deep Link)',
    'showcase.share_whatsapp': 'Share via WhatsApp',
    'showcase.share_telegram': 'Share via Telegram',
    'showcase.share_email': 'Send via Email',
    'showcase.copy_link': 'Copy Invitation Link',
    'showcase.link_copied': 'Direct referral link copied to clipboard!',
    'showcase.referral_bonus': 'HYCO Referral Program: Earn up to $500 rent credit when your referred business executes a lease agreement.',

    // My Lease
    'lease.title': 'My Lease Agreement & Building Dossier',
    'lease.subtitle': 'Formal lease specifications, Marion County legal compliance, and emergency numbers',
    'lease.property': 'Property Complex',
    'lease.suite': 'Assigned Suite',
    'lease.sqft': 'Rentable Area',
    'lease.term': 'Lease Term',
    'lease.start_date': 'Commencement Date',
    'lease.end_date': 'Expiration Date',
    'lease.monthly_rate': 'Contracted Rate',
    'lease.management_office': 'Indianapolis Management Office',
    'lease.address_full': '7898 Zionsville Road, Indianapolis, IN 46268',
    'lease.phone_full': '(317) 675-0041',
    'lease.email_full': 'info@hycoprop.com',
  },
  es: {
    // Nav & General
    'app.title': 'Portal de Inquilinos HYCO',
    'app.tagline': 'PWA de Autoservicio para Inquilinos Comerciales y Residenciales',
    'nav.overview': 'Resumen',
    'nav.surveillance': 'CCTV y Seguridad',
    'nav.billing': 'Facturación y Pagos',
    'nav.maintenance': 'Mantenimiento y Soporte',
    'nav.announcements': 'Comunicados',
    'nav.showcase': 'Suites Disponibles',
    'nav.lease': 'Mi Contrato de Renta',
    'nav.logout': 'Cerrar Sesión',
    'common.live': 'EN VIVO',
    'common.refresh': 'Actualizar',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.save': 'Guardar',
    'common.close': 'Cerrar',
    'common.download': 'Descargar',
    'common.view': 'Ver',
    'common.search': 'Buscar...',
    'common.back': 'Volver',
    'common.emergency': 'Contacto de Seguridad de Emergencia',
    'common.status': 'Estado',
    'common.date': 'Fecha',
    'common.amount': 'Monto',
    'common.actions': 'Acciones',

    // Login
    'login.title': 'Portal de Inquilinos HYCO',
    'login.subtitle': 'Inicie sesión para gestionar pagos de renta, cámaras en vivo y soporte 24/7',
    'login.account_id': 'Código de Cuenta o Correo Electrónico',
    'login.account_placeholder': 'ej. ACCT-1042 o inquilino@empresa.com',
    'login.password': 'PIN de Acceso o Contraseña',
    'login.password_placeholder': '••••••••',
    'login.submit': 'Ingresar al Portal',
    'login.quick_demo': 'Acceso Rápido de Demostración',
    'login.quick_demo_desc': 'Seleccione un inquilino comercial de Indianápolis para explorar la aplicación:',
    'login.commercial_badge': 'COMERCIAL',
    'login.industrial_badge': 'INDUSTRIAL',
    'login.help': '¿Requiere ayuda para acceder? Contacte a la administración al (317) 675-0041',

    // Overview
    'overview.welcome': 'Bienvenido de nuevo,',
    'overview.suite': 'Suite Arrendada',
    'overview.rent_due': 'Próximo Vencimiento',
    'overview.balance': 'Saldo Pendiente',
    'overview.balance_paid': 'Saldo al Día (Conciliado)',
    'overview.pay_now': 'Pagar Renta Ahora',
    'overview.open_tickets': 'Mantenimientos Activos',
    'overview.cctv_quick': 'Cámaras Perimetrales en Vivo',
    'overview.cctv_quick_desc': 'Transmisión Hikvision activa en tiempo real',
    'overview.view_all_cams': 'Ver Cuadrícula de Cámaras',
    'overview.latest_announcement': 'Último Aviso del Edificio',
    'overview.refer_friend': 'Recomendar un Colega / Empresa',
    'overview.refer_desc': 'Comparta suites disponibles de HYCO y reciba créditos de arrendamiento',

    // CCTV & Surveillance
    'cctv.title': 'Circuito Cerrado y Cámaras en Vivo',
    'cctv.subtitle': 'Transmisiones en tiempo real de accesos, estacionamientos y muelles vía Hikvision y Hik-Connect',
    'cctv.hikvision_badge': 'Hikvision Cloud P2P Activo',
    'cctv.stream_quality': '1080p Full HD • 20 FPS',
    'cctv.cam_select': 'Seleccionar Canal de Cámara',
    'cctv.cam_perimeter': 'Perímetro y Portón Principal',
    'cctv.cam_parking': 'Estacionamiento Norte de Visitantes',
    'cctv.cam_dock': 'Muelles de Carga y Patio de Maniobras',
    'cctv.cam_lobby': 'Lobby Principal y Acceso Ejecutivo',
    'cctv.night_vision': 'Visión Nocturna IR',
    'cctv.night_vision_on': 'Modo Nocturno ACTIVO',
    'cctv.night_vision_off': 'Modo Día',
    'cctv.snapshot': 'Capturar Foto',
    'cctv.snapshot_saved': 'Captura guardada con marca de agua y fecha oficial',
    'cctv.fullscreen': 'Pantalla Completa',
    'cctv.privacy_notice': 'Aviso de Privacidad: Exclusivamente las zonas exteriores y áreas comunes de su complejo están disponibles. Las suites privadas son estrictamente confidenciales.',
    'cctv.emergency_dispatch': 'Llamar a Despacho de Seguridad (317) 675-0041',
    'cctv.integration_info': 'Puente Hik-Connect OpenAPI',
    'cctv.integration_desc': 'Transmisión segura mediante tokens temporales HLS/WebRTC. Los puertos locales del grabador NVR permanecen blindados.',

    // Billing
    'billing.title': 'Facturación y Pagos de Renta',
    'billing.subtitle': 'Cobro mensual automatizado y conciliación bidireccional con QuickBooks Online (QBO)',
    'billing.summary': 'Estado de Cuenta Actual',
    'billing.total_due': 'Total por Pagar',
    'billing.due_date': 'Fecha de Corte',
    'billing.monthly_rent': 'Canon Mensual Base',
    'billing.cam_fees': 'Mantenimiento de Áreas Comunes (CAM)',
    'billing.payment_method': 'Método de Pago Preferido',
    'billing.pay_ach': 'Transferencia ACH Directa (Sin Comisión)',
    'billing.pay_card': 'Tarjeta de Crédito / Débito (Inmediato)',
    'billing.process_payment': 'Procesar Pago de Renta',
    'billing.payment_success': '¡Pago Aprobado y Conciliado con QuickBooks Online!',
    'billing.receipt_number': 'Referencia Oficial de Pago',
    'billing.receipt_download': 'Descargar Recibo Oficial Digital (PDF)',
    'billing.invoices_history': 'Historial de Facturas y Pagos',
    'billing.status_paid': 'PAGADO Y CONCILIADO',
    'billing.status_pending': 'PAGO PENDIENTE',
    'billing.status_overdue': 'VENCIDO',

    // Maintenance / Helpdesk
    'maintenance.title': 'Mesa de Ayuda y Mantenimiento 24/7',
    'maintenance.subtitle': 'Reporte incidencias con fotos/videos y siga el progreso de solución en tiempo real',
    'maintenance.new_ticket': 'Abrir Nuevo Ticket de Mantenimiento',
    'maintenance.category': 'Categoría del Reporte',
    'maintenance.category_plumbing': 'Plomería y Agua',
    'maintenance.category_electrical': 'Electricidad e Iluminación',
    'maintenance.category_hvac': 'Climatización y HVAC',
    'maintenance.category_common': 'Áreas Comunes y Puertas',
    'maintenance.category_access': 'Control de Acceso y Cerraduras',
    'maintenance.priority': 'Nivel de Prioridad',
    'maintenance.priority_low': 'Baja (Rutinario)',
    'maintenance.priority_medium': 'Media (Estándar 24h)',
    'maintenance.priority_high': 'Alta (Urgente 4h)',
    'maintenance.priority_emergency': 'Emergencia (Inmediato)',
    'maintenance.description': 'Descripción Detallada del Problema',
    'maintenance.description_placeholder': 'Describa lo ocurrido, ubicación exacta en la suite o área común...',
    'maintenance.media_upload': 'Adjuntar Fotos o Video del Problema',
    'maintenance.media_upload_desc': 'Arrastre archivos o tome una foto con su teléfono. Conversión automática WebP.',
    'maintenance.submit_ticket': 'Despachar Solicitud a la Administración',
    'maintenance.step_received': 'Recibido',
    'maintenance.step_review': 'En Revisión',
    'maintenance.step_assigned': 'Técnico Asignado',
    'maintenance.step_resolved': 'Resuelto y Certificado',
    'maintenance.technician': 'Contratista Certificado Asignado',
    'maintenance.active_tickets': 'Tickets en Proceso',
    'maintenance.resolved_tickets': 'Historial de Trabajos Resueltos',

    // Announcements
    'announcements.title': 'Muro de Comunicados del Edificio',
    'announcements.subtitle': 'Avisos directos de la administración, cronogramas de mantenimiento preventivo y alertas',
    'announcements.all': 'Todos los Avisos',
    'announcements.pinned': 'Comunicado Prioritario',

    // Showcase & Referrals
    'showcase.title': 'Vitrina de Suites y Motor de Referidos',
    'showcase.subtitle': 'Conozca espacios comerciales e industriales disponibles en Indianápolis y recomiéndelos',
    'showcase.share_suite': 'Compartir Suite (Enlace Inteligente)',
    'showcase.share_whatsapp': 'Compartir por WhatsApp',
    'showcase.share_telegram': 'Compartir por Telegram',
    'showcase.share_email': 'Enviar por Correo',
    'showcase.copy_link': 'Copiar Enlace de Invitación',
    'showcase.link_copied': '¡Enlace directo copiado al portapapeles!',
    'showcase.referral_bonus': 'Programa de Referidos HYCO: Reciba hasta $500 de crédito de renta cuando la empresa recomendada firme contrato.',

    // My Lease
    'lease.title': 'Expediente de Contrato de Renta',
    'lease.subtitle': 'Especificaciones legales del contrato, normativa del Condado de Marion y contactos de emergencia',
    'lease.property': 'Complejo Inmobiliario',
    'lease.suite': 'Suite Asignada',
    'lease.sqft': 'Área Rentable',
    'lease.term': 'Vigencia de Contrato',
    'lease.start_date': 'Fecha de Inicio',
    'lease.end_date': 'Fecha de Vencimiento',
    'lease.monthly_rate': 'Canon Acordado',
    'lease.management_office': 'Oficina Central de Administración',
    'lease.address_full': '7898 Zionsville Road, Indianapolis, IN 46268',
    'lease.phone_full': '(317) 675-0041',
    'lease.email_full': 'info@hycoprop.com',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hyco_client_language') as Language;
      if (saved && (saved === 'en' || saved === 'es')) {
        startTransition(() => {
          setLanguageState(saved);
        });
      }
    } catch {
      // Fallback
    }
  }, []);

  const setLanguage = (lang: Language) => {
    startTransition(() => {
      setLanguageState(lang);
    });
    try {
      localStorage.setItem('hyco_client_language', lang);
    } catch {
      // Fallback
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

