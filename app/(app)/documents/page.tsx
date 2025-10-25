"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Download,
  Eye,
  Edit,
  Share,
  CheckCircle,
  Award,
  Shield,
  Calendar,
  Clock,
  Users,
  Stamp,
  FileCheck,
  Printer,
  Mail,
  Lock,
  Star,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { Heart } from "lucide-react" // Import Heart icon

interface Document {
  id: string
  name: string
  type: string
  status: "draft" | "review" | "final" | "signed"
  createdAt: string
  lastModified: string
  version: number
  size: string
  pages: number
  witnesses: string[]
  notarized: boolean
  legalCompliance: boolean
}

const documentTemplates = [
  {
    id: "simple-will",
    name: "Simple Will",
    description: "Basic will template for straightforward estates",
    features: ["Asset distribution", "Beneficiary designation", "Executor appointment"],
    complexity: "Simple",
    estimatedTime: "15 minutes",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "comprehensive-will",
    name: "Comprehensive Will",
    description: "Detailed will with advanced provisions and trusts",
    features: ["Trust provisions", "Tax optimization", "Contingency planning", "Guardian appointments"],
    complexity: "Advanced",
    estimatedTime: "45 minutes",
    icon: FileCheck,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "living-will",
    name: "Living Will",
    description: "Healthcare directives and end-of-life preferences",
    features: ["Medical decisions", "Life support preferences", "Healthcare proxy"],
    complexity: "Moderate",
    estimatedTime: "25 minutes",
    icon: Heart,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "power-of-attorney",
    name: "Power of Attorney",
    description: "Legal authority for financial and legal decisions",
    features: ["Financial authority", "Legal decisions", "Healthcare decisions"],
    complexity: "Moderate",
    estimatedTime: "20 minutes",
    icon: Stamp,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Last Will and Testament - John Smith",
      type: "comprehensive-will",
      status: "review",
      createdAt: "2024-01-15",
      lastModified: "2024-01-20",
      version: 3,
      size: "2.4 MB",
      pages: 12,
      witnesses: ["Sarah Johnson", "Michael Brown"],
      notarized: false,
      legalCompliance: true,
    },
    {
      id: "2",
      name: "Living Will - John Smith",
      type: "living-will",
      status: "draft",
      createdAt: "2024-01-18",
      lastModified: "2024-01-18",
      version: 1,
      size: "1.2 MB",
      pages: 6,
      witnesses: [],
      notarized: false,
      legalCompliance: true,
    },
    {
      id: "3",
      name: "Power of Attorney - John Smith",
      type: "power-of-attorney",
      status: "final",
      createdAt: "2024-01-10",
      lastModified: "2024-01-12",
      version: 2,
      size: "1.8 MB",
      pages: 8,
      witnesses: ["Sarah Johnson"],
      notarized: true,
      legalCompliance: true,
    },
  ])

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null)

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-gray-100 text-gray-700",
      review: "bg-yellow-100 text-yellow-700",
      final: "bg-blue-100 text-blue-700",
      signed: "bg-green-100 text-green-700",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      draft: Edit,
      review: Eye,
      final: FileCheck,
      signed: CheckCircle,
    }
    return icons[status as keyof typeof icons] || Edit
  }

  const generateDocument = async (templateId: string) => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate document generation process
    const steps = [
      "Collecting will data...",
      "Applying legal template...",
      "Validating compliance...",
      "Formatting document...",
      "Generating PDF...",
      "Finalizing document...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setGenerationProgress(((i + 1) / steps.length) * 100)
    }

    // Add new document
    const template = documentTemplates.find((t) => t.id === templateId)
    const newDocument: Document = {
      id: Date.now().toString(),
      name: `${template?.name} - John Smith`,
      type: templateId,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      version: 1,
      size: "1.5 MB",
      pages: 8,
      witnesses: [],
      notarized: false,
      legalCompliance: true,
    }

    setDocuments([newDocument, ...documents])
    setIsGenerating(false)
    setGenerationProgress(0)
    setSelectedTemplate(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LegacyBuilder
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/will-builder">
                <Button variant="ghost">Will Builder</Button>
              </Link>
              <Link href="/assets">
                <Button variant="ghost">Assets</Button>
              </Link>
              <Link href="/beneficiaries">
                <Button variant="ghost">Beneficiaries</Button>
              </Link>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Shield className="w-3 h-3 mr-1" />
                Documents Secured
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Document Generation</h1>
            <p className="text-xl text-slate-600 mb-6">
              Create, manage, and finalize your legal documents with professional templates
            </p>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-white">{documents.length}</p>
                  <p className="text-sm text-slate-600">Total Documents</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-white">
                    {documents.filter((d) => d.status === "signed").length}
                  </p>
                  <p className="text-sm text-slate-600">Signed</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-4 text-center">
                  <Stamp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold text-white">{documents.filter((d) => d.notarized).length}</p>
                  <p className="text-sm text-slate-600">Notarized</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold text-white">
                    {documents.filter((d) => d.legalCompliance).length}
                  </p>
                  <p className="text-sm text-slate-600">Compliant</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="documents" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                My Documents
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="signing" className="flex items-center gap-2">
                <Stamp className="w-4 h-4" />
                Signing & Notary
              </TabsTrigger>
            </TabsList>

            <Dialog open={selectedTemplate !== null} onOpenChange={() => setSelectedTemplate(null)}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Document
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Generate New Document</DialogTitle>
                  <DialogDescription>Choose a template to create your legal document.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {documentTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedTemplate === template.id ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg ${template.bgColor} flex items-center justify-center`}>
                            <template.icon className={`w-5 h-5 ${template.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{template.name}</h3>
                            <p className="text-xs text-white mb-2">{template.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {template.complexity}
                              </Badge>
                              <span className="text-xs text-slate-500">{template.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => selectedTemplate && generateDocument(selectedTemplate)}
                    disabled={!selectedTemplate}
                  >
                    Generate Document
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="documents" className="space-y-4">
            <div className="grid gap-4">
              {documents.map((document, index) => {
                const StatusIcon = getStatusIcon(document.status)
                return (
                  <motion.div
                    key={document.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-white">{document.name}</h3>
                                <Badge className={getStatusColor(document.status)}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                                </Badge>
                                {document.legalCompliance && (
                                  <Badge className="bg-green-100 text-green-700">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Compliant
                                  </Badge>
                                )}
                                {document.notarized && (
                                  <Badge className="bg-purple-100 text-purple-700">
                                    <Stamp className="w-3 h-3 mr-1" />
                                    Notarized
                                  </Badge>
                                )}
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                <div>
                                  <p className="text-slate-500">Version</p>
                                  <p className="font-semibold">v{document.version}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Pages</p>
                                  <p className="font-semibold">{document.pages}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Size</p>
                                  <p className="font-semibold">{document.size}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Last Modified</p>
                                  <p className="font-semibold">
                                    {new Date(document.lastModified).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>

                              {document.witnesses.length > 0 && (
                                <div className="mb-3">
                                  <p className="text-sm text-slate-500 mb-1">Witnesses:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {document.witnesses.map((witness, idx) => (
                                      <Badge key={idx} variant="secondary" className="text-xs">
                                        <Users className="w-3 h-3 mr-1" />
                                        {witness}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            <Button variant="ghost" size="sm" onClick={() => setPreviewDocument(document)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {documentTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg ${template.bgColor} flex items-center justify-center`}>
                          <template.icon className={`w-6 h-6 ${template.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">{template.complexity}</Badge>
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Clock className="w-4 h-4" />
                            {template.estimatedTime}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">Features included:</p>
                          <ul className="space-y-1">
                            {template.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full" onClick={() => generateDocument(template.id)}>
                          Use This Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="signing" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stamp className="w-5 h-5" />
                    Digital Signing
                  </CardTitle>
                  <CardDescription>Sign your documents electronically with legal validity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Secure & Legal</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Our digital signatures are legally binding and comply with electronic signature laws.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Sign Document
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Request Witness Signatures
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Send for Review
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stamp className="w-5 h-5" />
                    Notary Services
                  </CardTitle>
                  <CardDescription>Professional notary services for your legal documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-purple-900">Certified Notaries</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Connect with licensed notaries for in-person or remote notarization.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Notary Appointment
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Remote Notarization
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <FileCheck className="w-4 h-4 mr-2" />
                      Verify Notarized Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Generation Progress Modal */}
        <Dialog open={isGenerating} onOpenChange={() => {}}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generating Your Document</DialogTitle>
              <DialogDescription>Please wait while we create your professional legal document.</DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <Progress value={generationProgress} className="h-2 mb-4" />
              <p className="text-center text-sm text-slate-600">
                {generationProgress < 100 ? `${Math.round(generationProgress)}% complete` : "Finalizing..."}
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Document Preview Modal */}
        <Dialog open={previewDocument !== null} onOpenChange={() => setPreviewDocument(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>{previewDocument?.name}</DialogTitle>
              <DialogDescription>Document preview and details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-slate-100 rounded-lg p-8 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-600">Document preview would appear here</p>
                <p className="text-sm text-slate-500 mt-2">
                  {previewDocument?.pages} pages • {previewDocument?.size}
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
