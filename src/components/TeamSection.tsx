import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Twitter, Github } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  initials: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "10+ years in web development. Former lead engineer at top tech companies. Passionate about creating accessible digital solutions.",
    initials: "AJ",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    bio: "Award-winning UI/UX designer with expertise in creating intuitive, beautiful interfaces that users love.",
    initials: "SC",
    socials: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Marcus Williams",
    role: "Senior Developer",
    bio: "Full-stack developer specializing in React and Node.js. Building scalable SaaS solutions for 8+ years.",
    initials: "MW",
    socials: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Emily Rodriguez",
    role: "Project Manager",
    bio: "Certified PMP with a track record of delivering complex projects on time. Expert in agile methodologies.",
    initials: "ER",
    socials: {
      linkedin: "#",
      twitter: "#"
    }
  }
];

const TeamSection = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The passionate experts behind every successful project we deliver.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="glass-card border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="text-lg font-semibold gradient-bg text-primary-foreground">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {member.bio}
                </p>
                {member.socials && (
                  <div className="flex justify-center gap-3">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
