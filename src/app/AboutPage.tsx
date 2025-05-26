"use client";

import { LoaderComponent } from "@/components/shared/LoaderComponent";
import { getAbout } from "@/services/about.service";
import { TAbout, TMongoose } from "@/types/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Edit, Download } from "lucide-react";
import Image from "next/image";
import { Modal } from "@/components/shared/Modal";
import AboutForm from "@/components/forms/AboutForm";
import { FileUploader } from "@/components/shared/FileUploader";

const AboutPage = () => {
  const [about, setAbout] = useState<TAbout & TMongoose>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await getAbout();
        setAbout(res?.data[0]);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) return <LoaderComponent centered size={"xl"} />;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">About Me</h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal information and profile
          </p>
        </div>
        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          trigger={
            <Button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          }
          content={<AboutForm setIsOpen={setIsEditModalOpen} data={about} />}
          title="Edit About Information"
        />
      </div>

      {about && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src={about.image}
                  alt={about.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-2xl">{about.name}</CardTitle>
              <CardDescription className="text-lg font-medium text-primary">
                {about.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {about.address}
              </div>
              {about.resumeLink && (
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href={about.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </a>
                </Button>
              )}

              <FileUploader
                label="Upload Resume"
                resumeFileId={about.resumeLink as string}
              />
            </CardContent>
          </Card>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{about.bio}</p>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {about.education?.map((edu, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-primary pl-4 py-2"
                  >
                    <h4 className="font-semibold text-lg">{edu.degree}</h4>
                    <p className="text-primary font-medium">
                      {edu.institution}
                    </p>
                    {edu.department && (
                      <p className="text-muted-foreground">
                        Department: {edu.department}
                      </p>
                    )}
                    {edu.year && (
                      <Badge variant="secondary" className="mt-2">
                        {edu.year}
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Experience */}
            {about.experience && about.experience.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {about.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-secondary pl-4 py-3"
                    >
                      <h4 className="font-semibold text-lg">{exp.title}</h4>
                      <p className="text-secondary font-medium">
                        {exp.company}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {exp.duration}
                      </p>
                      <p className="text-foreground mb-3">{exp.description}</p>
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
