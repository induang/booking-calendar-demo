export type LarkCalendarEvent = {
  app_link?: string;
  // attendee_ability: 'can_invite_others',
  // color: -1,
  create_time?: string;
  description?: string;
  end_time?: { timestamp?: string; timezone?: string };
  event_id: string;
  event_organizer?: {
    display_name?: string;
    user_id?: string;
  };
  // free_busy_status: "busy";
  is_exception?: boolean;
  location?: {
    address?: string;
    latitude?: number;
    longitude?: number;
    name?: string;
  };
  organizer_calendar_id?: string;
  recurrence?: string;
  start_time?: { timestamp?: string; timezone?: string };
  status?: string;
  summary?: string;
  vchat?: { meeting_url?: string; vc_type?: string };
  // visibility: string;
};
