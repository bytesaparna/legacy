import { Assets } from "@/utils/assets"
import { z } from "zod"
import { create } from "zustand"

export const WillDataSchema = z.object({
    personalInfo: z.object({
        fullName: z.string().min(1, "Full name is required"),
        dateOfBirth: z.string().min(1, "Date of birth is required"),
        address: z.string().min(1, "Address is required"),
        maritalStatus: z.string().min(1, "Marital status is required"),
        occupation: z.string().optional(),
    }),
    assets: z.array(
        z.object({
            id: z.string(),
            type: z.string(),
            description: z.string(),
            value: z.string().or(z.number()).optional(),
            location: z.string(),
            documents: z.array(z.string()),
            notes: z.string(),
            category: z.string(),
            name: z.string(),
        })
    ),

    beneficiaries: z.array(
        z.object({
            name: z.string(),
            relationship: z.string().optional(),
            share: z.string().or(z.number()).optional(),
        })
    ),
    executor: z.object({
        name: z.string(),
        relationship: z.string().optional(),
        address: z.string().optional(),
    }),
    guardians: z.array(
        z.object({
            name: z.string(),
            relationship: z.string().optional(),
        })
    ),
    specialInstructions: z.string().optional(),
})

export type WillData = z.infer<typeof WillDataSchema>

interface WillDataStore {
    willData: WillData
    updateWillData: (data: Partial<WillData>) => void
    resetWillData: () => void,
    step: number,
    maximumStep: number
    setStep: (step: number) => void,
}

export const useWillDataStore = create<WillDataStore>((set) => ({
    willData: {
        personalInfo: {
            fullName: "",
            dateOfBirth: "",
            address: "",
            maritalStatus: "",
            occupation: "",
        },
        assets: [{
            id: "1",
            type: "",
            category: "",
            name: "",
            description: "",
            value: 0,
            purchaseDate: "",
            location: "",
            beneficiary: "",
            documents: [""],
            notes: "",
            relationship: "",
        }],
        beneficiaries: [],
        executor: { name: "", relationship: "", address: "" },
        guardians: [],
        specialInstructions: "",
    },
    updateWillData: (data) =>
        set((state) => ({
            willData: {
                ...state.willData,
                ...data,
            },
        })),
    resetWillData: () =>
        set({
            willData: {
                personalInfo: {
                    fullName: "",
                    dateOfBirth: "",
                    address: "",
                    maritalStatus: "",
                    occupation: "",
                },
                assets: [],
                beneficiaries: [],
                executor: { name: "", relationship: "", address: "" },
                guardians: [],
                specialInstructions: "",
            },
            step: 1
        }),
    step: 1,
    maximumStep: 8,
    setStep: (step: number) => {
        set(() => ({
            step
        }))
    }
}))
