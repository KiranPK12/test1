"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { Event } from "@/types";

interface EventDetailsParams {
  params: {
    id: string;
  };
}
const EventDetailsPage = ({ params: { id } }: EventDetailsParams) => {
  const eventId = id as Id<"events">;
  const eventDetail = useQuery(api.events.getEventById, {
    id: eventId,
  }) as Event;
  const [eventDetails, seteventDetails] = useState<Event>();

  useEffect(() => {
    eventDetail && seteventDetails(eventDetail);
  }, [eventDetail]);

  console.log(id, eventDetails);
  if (!eventDetails) {
  } else {
    return (
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          {/* <p>Event Details Page</p> */}
          <Image
            src={eventDetails.imageUrl}
            alt=""
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />
          <p>{eventDetails.title}</p>
        </div>
      </section>
    );
  }
};

export default EventDetailsPage;
