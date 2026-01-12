"use client"

import { ResponsiveModal } from "@/components/responsive-model";
import { CreateProjectForm } from "./create-project-form";
import { useCreateProjecteModal } from "../hooks/use-create-project-modal";

export const CreateProjectModal = () => {
    const { isOpen, setIsOpen, close } = useCreateProjecteModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen} >
            <CreateProjectForm onCancel={close} />
        </ResponsiveModal>
    )
}
