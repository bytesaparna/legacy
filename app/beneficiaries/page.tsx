"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Heart,
  Phone,
  Mail,
  MapPin,
  Plus,
  Edit,
  Trash2,
  PieChart,
  AlertTriangle,
  CheckCircle,
  Award,
  Shield,
  Send,
  UserCheck,
} from "lucide-react"
import Link from "next/link"

interface Beneficiary {
  id: string
  name: string
  relationship: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  percentage: number
  contingent: boolean
  primaryBeneficiary?: string
  notes: string
  verified: boolean
  lastContact: string
  avatar?: string
}

const relationshipTypes = [
  "Spouse",
  "Child",
  "Parent",
  "Sibling",
  "Grandchild",
  "Grandparent",
  "Aunt/Uncle",
  "Cousin",
  "Friend",
  "Charity",
  "Organization",
  "Other",
]

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      relationship: "Spouse",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
      dateOfBirth: "1985-03-15",
      percentage: 60,
      contingent: false,
      notes: "Primary beneficiary, married 15 years",
      verified: true,
      lastContact: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Michael Johnson",
      relationship: "Child",
      email: "michael.j@email.com",
      phone: "+1 (555) 234-5678",
      address: "123 Main St, City, State 12345",
      dateOfBirth: "2010-07-22",
      percentage: 25,
      contingent: false,
      notes: "Eldest child, college fund established",
      verified: true,
      lastContact: "2024-01-10",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Emma Johnson",
      relationship: "Child",
      email: "",
      phone: "",
      address: "123 Main St, City, State 12345",
      dateOfBirth: "2013-11-08",
      percentage: 15,
      contingent: false,
      notes: "Youngest child, trust fund to be established",
      verified: false,
      lastContact: "",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Robert Johnson Sr.",
      relationship: "Parent",
      email: "robert.sr@email.com",
      phone: "+1 (555) 345-6789",
      address: "456 Oak Ave, City, State 12345",
      dateOfBirth: "1955-12-03",
      percentage: 0,
      contingent: true,
      primaryBeneficiary: "1",
      notes: "Contingent beneficiary if spouse predeceases",
      verified: true,
      lastContact: "2023-12-20",
    },
  ])

  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null)
  const [isAddingBeneficiary, setIsAddingBeneficiary] = useState(false)
  const [editingBeneficiary, setEditingBeneficiary] = useState<Beneficiary | null>(null)

  const [newBeneficiary, setNewBeneficiary] = useState<Partial<Beneficiary>>({
    name: "",
    relationship: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    percentage: 0,
    contingent: false,
    notes: "",
    verified: false,
    lastContact: "",
  })

  const primaryBeneficiaries = beneficiaries.filter((b) => !b.contingent)
  const contingentBeneficiaries = beneficiaries.filter((b) => b.contingent)
  const totalPrimaryPercentage = primaryBeneficiaries.reduce((sum, b) => sum + b.percentage, 0)
  const unverifiedCount = beneficiaries.filter((b) => !b.verified).length

  const addBeneficiary = () => {
    if (newBeneficiary.name && newBeneficiary.relationship) {
      const beneficiary: Beneficiary = {
        id: Date.now().toString(),
        name: newBeneficiary.name,
        relationship: newBeneficiary.relationship,
        email: newBeneficiary.email || "",
        phone: newBeneficiary.phone || "",
        address: newBeneficiary.address || "",
        dateOfBirth: newBeneficiary.dateOfBirth || "",
        percentage: newBeneficiary.percentage || 0,
        contingent: newBeneficiary.contingent || false,
        notes: newBeneficiary.notes || "",
        verified: false,
        lastContact: "",
      }
      setBeneficiaries([...beneficiaries, beneficiary])
      setNewBeneficiary({})
      setIsAddingBeneficiary(false)
    }
  }

  const deleteBeneficiary = (id: string) => {
    setBeneficiaries(beneficiaries.filter((b) => b.id !== id))
  }

  const updateBeneficiaryPercentage = (id: string, percentage: number) => {
    setBeneficiaries(beneficiaries.map((b) => (b.id === id ? { ...b, percentage } : b)))
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getRelationshipColor = (relationship: string) => {
    const colors: { [key: string]: string } = {
      Spouse: "bg-pink-100 text-pink-700",
      Child: "bg-blue-100 text-blue-700",
      Parent: "bg-green-100 text-green-700",
      Sibling: "bg-purple-100 text-purple-700",
      Friend: "bg-orange-100 text-orange-700",
      Charity: "bg-teal-100 text-teal-700",
    }
    return colors[relationship] || "bg-gray-100 text-gray-700"
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
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Shield className="w-3 h-3 mr-1" />
                Family Protected
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Beneficiary Management</h1>
            <p className="text-xl text-slate-600 mb-6">
              Manage your beneficiaries and ensure your legacy reaches the right people
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
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-slate-900">{beneficiaries.length}</p>
                  <p className="text-sm text-slate-600">Total Beneficiaries</p>
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
                  <Heart className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                  <p className="text-2xl font-bold text-slate-900">{primaryBeneficiaries.length}</p>
                  <p className="text-sm text-slate-600">Primary</p>
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
                  <PieChart className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-slate-900">{totalPrimaryPercentage}%</p>
                  <p className="text-sm text-slate-600">Allocated</p>
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
                  {unverifiedCount > 0 ? (
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                  ) : (
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  )}
                  <p className="text-2xl font-bold text-slate-900">{unverifiedCount}</p>
                  <p className="text-sm text-slate-600">Unverified</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Allocation Warning */}
          {totalPrimaryPercentage !== 100 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-semibold text-amber-800">
                        Allocation {totalPrimaryPercentage > 100 ? "Exceeds" : "Incomplete"}
                      </p>
                      <p className="text-sm text-amber-700">
                        Primary beneficiaries are allocated {totalPrimaryPercentage}% of your estate.
                        {totalPrimaryPercentage > 100
                          ? " Please reduce allocations to 100%."
                          : " Consider allocating the remaining " + (100 - totalPrimaryPercentage) + "%."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="primary" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="primary" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Primary ({primaryBeneficiaries.length})
              </TabsTrigger>
              <TabsTrigger value="contingent" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Contingent ({contingentBeneficiaries.length})
              </TabsTrigger>
              <TabsTrigger value="allocation" className="flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                Allocation
              </TabsTrigger>
            </TabsList>

            <Dialog open={isAddingBeneficiary} onOpenChange={setIsAddingBeneficiary}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Beneficiary
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Beneficiary</DialogTitle>
                  <DialogDescription>Enter the details of your beneficiary to add them to your will.</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter full legal name"
                      value={newBeneficiary.name}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship *</Label>
                    <Select
                      value={newBeneficiary.relationship}
                      onValueChange={(value) => setNewBeneficiary({ ...newBeneficiary, relationship: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        {relationshipTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="percentage">Inheritance Percentage</Label>
                    <Input
                      id="percentage"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      value={newBeneficiary.percentage}
                      onChange={(e) =>
                        setNewBeneficiary({ ...newBeneficiary, percentage: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={newBeneficiary.email}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={newBeneficiary.phone}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Full address"
                      value={newBeneficiary.address}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={newBeneficiary.dateOfBirth}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, dateOfBirth: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Beneficiary Type</Label>
                    <Select
                      value={newBeneficiary.contingent ? "contingent" : "primary"}
                      onValueChange={(value) =>
                        setNewBeneficiary({ ...newBeneficiary, contingent: value === "contingent" })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary Beneficiary</SelectItem>
                        <SelectItem value="contingent">Contingent Beneficiary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional information about this beneficiary"
                      value={newBeneficiary.notes}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, notes: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingBeneficiary(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addBeneficiary}>Add Beneficiary</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="primary" className="space-y-4">
            <div className="grid gap-4">
              {primaryBeneficiaries.map((beneficiary, index) => (
                <motion.div
                  key={beneficiary.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={beneficiary.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-lg font-semibold">
                              {getInitials(beneficiary.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-slate-900">{beneficiary.name}</h3>
                              <Badge className={getRelationshipColor(beneficiary.relationship)}>
                                {beneficiary.relationship}
                              </Badge>
                              {beneficiary.verified ? (
                                <Badge className="bg-green-100 text-green-700">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge className="bg-amber-100 text-amber-700">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Unverified
                                </Badge>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="space-y-1">
                                <p className="text-sm text-slate-500">Inheritance</p>
                                <div className="flex items-center gap-2">
                                  <p className="text-2xl font-bold text-green-600">{beneficiary.percentage}%</p>
                                  <Progress value={beneficiary.percentage} className="flex-1 h-2" />
                                </div>
                              </div>

                              {beneficiary.email && (
                                <div className="space-y-1">
                                  <p className="text-sm text-slate-500">Email</p>
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <p className="text-sm font-medium">{beneficiary.email}</p>
                                  </div>
                                </div>
                              )}

                              {beneficiary.phone && (
                                <div className="space-y-1">
                                  <p className="text-sm text-slate-500">Phone</p>
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <p className="text-sm font-medium">{beneficiary.phone}</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {beneficiary.address && (
                              <div className="mb-3">
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                                  <p className="text-sm text-slate-600">{beneficiary.address}</p>
                                </div>
                              </div>
                            )}

                            {beneficiary.notes && (
                              <div className="p-3 bg-slate-50 rounded-lg">
                                <p className="text-sm text-slate-600">{beneficiary.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="ghost" size="sm">
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBeneficiary(beneficiary.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contingent" className="space-y-4">
            <div className="grid gap-4">
              {contingentBeneficiaries.map((beneficiary, index) => (
                <motion.div
                  key={beneficiary.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-dashed">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={beneficiary.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-br from-slate-400 to-slate-500 text-white text-lg font-semibold">
                              {getInitials(beneficiary.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-slate-900">{beneficiary.name}</h3>
                              <Badge className={getRelationshipColor(beneficiary.relationship)}>
                                {beneficiary.relationship}
                              </Badge>
                              <Badge className="bg-slate-100 text-slate-700">
                                <Shield className="w-3 h-3 mr-1" />
                                Contingent
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              {beneficiary.email && (
                                <div className="space-y-1">
                                  <p className="text-sm text-slate-500">Email</p>
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <p className="text-sm font-medium">{beneficiary.email}</p>
                                  </div>
                                </div>
                              )}

                              {beneficiary.phone && (
                                <div className="space-y-1">
                                  <p className="text-sm text-slate-500">Phone</p>
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <p className="text-sm font-medium">{beneficiary.phone}</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {beneficiary.notes && (
                              <div className="p-3 bg-slate-50 rounded-lg">
                                <p className="text-sm text-slate-600">{beneficiary.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBeneficiary(beneficiary.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Inheritance Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {primaryBeneficiaries.map((beneficiary) => (
                      <div key={beneficiary.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                                {getInitials(beneficiary.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{beneficiary.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={beneficiary.percentage}
                              onChange={(e) =>
                                updateBeneficiaryPercentage(beneficiary.id, Number.parseFloat(e.target.value) || 0)
                              }
                              className="w-16 h-8 text-sm"
                            />
                            <span className="text-sm text-slate-600">%</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${beneficiary.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Allocated:</span>
                        <span
                          className={`text-lg font-bold ${
                            totalPrimaryPercentage === 100
                              ? "text-green-600"
                              : totalPrimaryPercentage > 100
                                ? "text-red-600"
                                : "text-amber-600"
                          }`}
                        >
                          {totalPrimaryPercentage}%
                        </span>
                      </div>
                      {totalPrimaryPercentage !== 100 && (
                        <p className="text-sm text-slate-600 mt-1">
                          {totalPrimaryPercentage > 100
                            ? `Over-allocated by ${totalPrimaryPercentage - 100}%`
                            : `Remaining: ${100 - totalPrimaryPercentage}%`}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {beneficiaries.map((beneficiary) => (
                      <div
                        key={beneficiary.id}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                              {getInitials(beneficiary.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{beneficiary.name}</p>
                            <p className="text-xs text-slate-500">{beneficiary.relationship}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {beneficiary.verified ? (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              Verify
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
