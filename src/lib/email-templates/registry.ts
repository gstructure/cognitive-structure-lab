import type { ComponentType } from 'react'
import { template as bookingRequestReceived } from './booking-request-received'
import { template as bookingConfirmed } from './booking-confirmed'
import { template as bookingCancelled } from './booking-cancelled'
import { template as bookingAdminNotification } from './booking-admin-notification'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'booking-request-received': bookingRequestReceived,
  'booking-confirmed': bookingConfirmed,
  'booking-cancelled': bookingCancelled,
  'booking-admin-notification': bookingAdminNotification,
}
