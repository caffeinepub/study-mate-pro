import { GoldenSplit } from '@/components/layout/GoldenSplit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Languages, Download, Search, Sparkles } from 'lucide-react';
import { FileUploadPanel } from '@/components/files/FileUploadPanel';
import { UploadedFilesList } from '@/components/files/UploadedFilesList';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

export function HomePage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-12">
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/generated/study-buddy-mascot.dim_512x512.png" 
            alt="Study Buddy Mascot"
            className="h-32 w-32 object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Transform Your Study Materials
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Upload educational files, generate detailed bullet-point notes, get multilingual audio translations, and access your AI study buddy.
        </p>
      </section>

      {/* File Upload Section - Only show when authenticated */}
      {isAuthenticated && (
        <section className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <FileUploadPanel />
            <UploadedFilesList />
          </div>
        </section>
      )}

      {/* Main Content with Golden Ratio Split */}
      <GoldenSplit
        major={
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Key Features</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">File Upload</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Upload educational files in various formats for processing into comprehensive study materials.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Smart Notes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Generate detailed bullet-point study materials tailored to your learning goals and exam requirements.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Languages className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Multilingual Audio</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Listen to your study materials in multiple languages including Telugu and English with high-quality audio.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Download className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Easy Downloads</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Download your processed materials in various formats including TXT and Markdown for offline study.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>AI Study Buddy</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>
                  Your intelligent study companion that searches across all your materials and answers questions based on your uploaded content.
                </CardDescription>
                <Button className="w-full sm:w-auto">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Try AI Buddy
                </Button>
              </CardContent>
            </Card>
          </div>
        }
        minor={
          <div className="space-y-6">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Follow these simple steps to transform your study materials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Sign In</h4>
                      <p className="text-sm text-muted-foreground">
                        Create your account with just your email
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Upload Files</h4>
                      <p className="text-sm text-muted-foreground">
                        Upload your educational materials
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Customize</h4>
                      <p className="text-sm text-muted-foreground">
                        Tell us what you need from the content
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Study & Download</h4>
                      <p className="text-sm text-muted-foreground">
                        Access your materials anytime, anywhere
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6" size="lg">
                  Get Started Now
                </Button>
              </CardContent>
            </Card>
          </div>
        }
      />

      {/* Additional Info Section */}
      <section className="py-12 text-center space-y-4">
        <h2 className="text-3xl font-bold">Perfect for Competitive Exam Preparation</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Whether you're preparing for entrance exams, certifications, or academic tests, 
          our platform helps you study smarter with AI-powered tools designed for students.
        </p>
      </section>
    </div>
  );
}
