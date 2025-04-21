"use client";

import {
  Calendar,
  CalendarProps,
  Event,
  Views,
  dayjsLocalizer,
} from "react-big-calendar";
import dayjs from "@/utils/date";
import { useMemo } from "react";
import { css, cx } from "@emotion/css";
import { EventBlock } from "@/components/course-calendar/EventBlock";

interface Props {
  events: Event[];
}
export const CourseCalendar = ({ events }: Props) => {
  const calendarProps: CalendarProps = useMemo(() => {
    const localizer = dayjsLocalizer(dayjs);
    const views = [Views.MONTH, Views.WEEK, Views.DAY];
    const components = {
      event: EventBlock,
      // eventWrapper: EventWrapper,
    };
    const defaultView = "week";
    const min = dayjs("2025-04-14 09:00").toDate();
    const max = dayjs("2025-04-14 17:00").toDate();

    // const onSelectEvent = (event: Event) => {
    //   setSelectedEvent(event);
    // };
    const eventPropGetter = (
      event: Event,
      start: Date,
      end: Date,
      isSelected: boolean
    ) => {
      return {
        className: cx(
          "text-black!",
          "bg-transparent! border-none! p-0!",
          isSelected && "border-none!",
          css`
            .rbc-event-label {
              display: none !important;
            }
          `
        ),
      };
    };

    return {
      localizer,
      views,
      components,
      defaultView,
      min,
      max,
      // onSelectEvent,
      eventPropGetter,
      showMultiDayTimes: true,
      step: 30,
    };
  }, []);

  return (
    <div className="h-[600px] w-[calc(100vw-200px)]">
      <Calendar {...calendarProps} events={events} />
    </div>
  );
};
