"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { SignInButton, useUser } from "@clerk/nextjs";
import {
  CalendarDays,
  MapPin,
  Ticket,
  Users,
  Info,
  AlertCircle,
  Clock,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useStorageUrl } from "@/lib/utils";
import EventCard from "@/components/EventCard";
import JoinQueue from "@/components/JoinQueue";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function EventPage() {
  const { user } = useUser();
  const params = useParams();
  const event = useQuery(api.events.getById, {
    eventId: params.id as Id<"events">,
  });
  const availability = useQuery(api.events.getEventAvailability, {
    eventId: params.id as Id<"events">,
  });
  const imageUrl = useStorageUrl(event?.imageStorageId);

  if (!event || !availability) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: imageUrl
              ? `url(${imageUrl})`
              : "url('/placeholder.svg?height=800&width=1200')",
            backgroundColor: "rgba(0,0,0,0.5)",
            backgroundBlendMode: "overlay",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/20" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
          <Badge className="mb-4 self-start bg-blue-500 text-white">
            {/* TODO: Add the date in the format of 1 arpil 2024 */}
            {new Date(event.eventDate).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            {event.name}
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">{event.description}</p>
        </div>
      </div>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Event Details */}
          <div className="md:col-span-2 space-y-8">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Detalles del Evento
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <CalendarDays className="h-5 w-5 text-blue-500" />
                  <span>
                    {new Date(event.eventDate).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>{new Date(event.eventDate).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Ticket className="h-5 w-5 text-blue-500" />
                  <span>MXN {event.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>
                    {availability.totalTickets - availability.purchasedCount} /{" "}
                    {availability.totalTickets} disponibles
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Información Importante
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-blue-700 dark:text-blue-300">
                    Por favor llegue 30 minutos antes del inicio del evento
                  </AlertDescription>
                </Alert>
                <Alert
                  variant="destructive"
                  className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                >
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700 dark:text-red-300">
                    Los boletos no son reembolsables
                  </AlertDescription>
                </Alert>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Restricción de edad: 18+
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="space-y-6 md:col-span-2">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-none ">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Reserva tus boletos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EventCard eventId={params.id as Id<"events">} />
              </CardContent>
              <Separator className="my-4" />
              <CardFooter>
                {user ? (
                  <div className="w-full">
                    <JoinQueue
                      eventId={params.id as Id<"events">}
                      userId={user.id}
                    />
                  </div>
                ) : (
                  <SignInButton>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      Iniciar sesión para comprar boletos
                    </Button>
                  </SignInButton>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
