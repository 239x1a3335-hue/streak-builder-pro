import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, ArrowRight, Zap } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  participants: number;
  status: "upcoming" | "ongoing" | "past";
  type: string;
}

const eventsData: Event[] = [
  {
    id: "1",
    title: "CodeSprint 2025",
    date: "January 15, 2025",
    time: "10:00 AM - 6:00 PM",
    description: "24-hour hackathon focused on building innovative solutions for real-world problems.",
    location: "Main Campus Auditorium",
    participants: 120,
    status: "upcoming",
    type: "Hackathon"
  },
  {
    id: "2",
    title: "Web Development Workshop",
    date: "January 10, 2025",
    time: "2:00 PM - 5:00 PM",
    description: "Hands-on workshop covering React, Node.js, and modern web technologies.",
    location: "Computer Lab 101",
    participants: 45,
    status: "ongoing",
    type: "Workshop"
  },
  {
    id: "3",
    title: "DSA Challenge",
    date: "January 8, 2025",
    time: "3:00 PM - 6:00 PM",
    description: "Competitive programming contest with problems ranging from easy to advanced.",
    location: "Online",
    participants: 200,
    status: "ongoing",
    type: "Contest"
  },
  {
    id: "4",
    title: "AI/ML Bootcamp",
    date: "December 20, 2024",
    time: "9:00 AM - 4:00 PM",
    description: "Intensive bootcamp covering machine learning fundamentals and practical applications.",
    location: "Innovation Hub",
    participants: 80,
    status: "past",
    type: "Bootcamp"
  },
  {
    id: "5",
    title: "Open Source Contribution Drive",
    date: "December 15, 2024",
    time: "10:00 AM - 12:00 PM",
    description: "Learn how to contribute to open source projects and build your GitHub profile.",
    location: "Online",
    participants: 60,
    status: "past",
    type: "Workshop"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "ongoing":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "past":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "";
  }
};

const EventCard = ({ event }: { event: Event }) => (
  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <Badge variant="outline" className={getStatusColor(event.status)}>
        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
      </Badge>
      <Badge variant="secondary">{event.type}</Badge>
    </div>
    
    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
      {event.title}
    </h3>
    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
    
    <div className="space-y-2 mb-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>{event.date}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>{event.time}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>{event.location}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="w-4 h-4" />
        <span>{event.participants} Participants</span>
      </div>
    </div>
    
    <div className="flex gap-2">
      <Link to={`/events/${event.id}`} className="flex-1">
        <Button variant="outline" size="sm" className="w-full gap-1">
          View Details
          <ArrowRight className="w-3 h-3" />
        </Button>
      </Link>
      {event.status === "ongoing" && (
        <Button size="sm" className="gap-1">
          <Zap className="w-3 h-3" />
          Participate
        </Button>
      )}
    </div>
  </div>
);

const EventsSection = () => {
  const upcomingEvents = eventsData.filter(e => e.status === "upcoming");
  const ongoingEvents = eventsData.filter(e => e.status === "ongoing");
  const pastEvents = eventsData.filter(e => e.status === "past");

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Events & Activities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Participate in hackathons, workshops, and coding contests to enhance your skills
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="upcoming" className="gap-1">
              <span className="hidden sm:inline">Upcoming</span>
              <Badge variant="secondary" className="ml-1">{upcomingEvents.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="gap-1">
              <span className="hidden sm:inline">Ongoing</span>
              <Badge variant="secondary" className="ml-1">{ongoingEvents.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="past" className="gap-1">
              <span className="hidden sm:inline">Past</span>
              <Badge variant="secondary" className="ml-1">{pastEvents.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No upcoming events at the moment. Check back soon!
              </div>
            )}
          </TabsContent>

          <TabsContent value="ongoing">
            {ongoingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No ongoing events right now.
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No past events to show.
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Event Timeline */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
            Event Timeline
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
            {[
              { step: "1", title: "Registration Open", desc: "Sign up for the event" },
              { step: "2", title: "Coding Starts", desc: "Begin your submission" },
              { step: "3", title: "Submission Deadline", desc: "Complete and submit" },
              { step: "4", title: "Results Announced", desc: "Winners declared" }
            ].map((item, index) => (
              <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold z-10">
                    {item.step}
                  </div>
                </div>
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
